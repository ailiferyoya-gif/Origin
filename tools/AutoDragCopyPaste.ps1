param(
    [int]$MinDragPixels = 8,
    [int]$CopyDelayMs = 80,
    [switch]$PasteOnMiddleClick,
    [switch]$AppendMode,
    [switch]$StripStandaloneNumberLines
)

Add-Type -AssemblyName System.Windows.Forms

Add-Type @"
using System;
using System.Runtime.InteropServices;

public static class MouseState {
    [DllImport("user32.dll")]
    public static extern short GetAsyncKeyState(int vKey);

    [DllImport("user32.dll")]
    public static extern bool GetCursorPos(out POINT lpPoint);

    public struct POINT {
        public int X;
        public int Y;
    }
}
"@

$VK_LBUTTON = 0x01
$VK_MBUTTON = 0x04
$VK_ESCAPE = 0x1B

function Test-KeyDown([int]$virtualKey) {
    return ([MouseState]::GetAsyncKeyState($virtualKey) -band 0x8000) -ne 0
}

function Get-MousePoint {
    $point = New-Object MouseState+POINT
    [void][MouseState]::GetCursorPos([ref]$point)
    return $point
}

function Remove-StandaloneNumberLines([string]$text) {
    if ([string]::IsNullOrEmpty($text)) {
        return $text
    }

    $lines = $text -split "`r?`n"
    $kept = New-Object System.Collections.Generic.List[string]

    foreach ($line in $lines) {
        if ($line -notmatch '^\s*\d+\s*$') {
            [void]$kept.Add($line)
        }
    }

    return [string]::Join([Environment]::NewLine, $kept).Trim()
}

Write-Host "AutoDragCopyPaste is running."
if ($AppendMode) {
    Write-Host "- Drag-select text, then release the left mouse button to append it to the copy buffer."
    Write-Host "- Press Esc to clear the copy buffer."
    if ($StripStandaloneNumberLines) {
        Write-Host "- Standalone line-number rows will be removed before appending."
    }
} else {
    Write-Host "- Drag-select text, then release the left mouse button to copy it automatically."
}
if ($PasteOnMiddleClick) {
    Write-Host "- Middle-click to paste."
}
Write-Host "- Press Ctrl+C in this PowerShell window to stop."

$wasLeftDown = $false
$wasMiddleDown = $false
$wasEscapeDown = $false
$dragStart = $null
$copyBuffer = ""

while ($true) {
    Start-Sleep -Milliseconds 20

    $leftDown = Test-KeyDown $VK_LBUTTON
    $middleDown = Test-KeyDown $VK_MBUTTON

    if ($leftDown -and -not $wasLeftDown) {
        $dragStart = Get-MousePoint
    }

    if (-not $leftDown -and $wasLeftDown -and $dragStart -ne $null) {
        $dragEnd = Get-MousePoint
        $dx = [Math]::Abs($dragEnd.X - $dragStart.X)
        $dy = [Math]::Abs($dragEnd.Y - $dragStart.Y)

        if (($dx -ge $MinDragPixels) -or ($dy -ge $MinDragPixels)) {
            Start-Sleep -Milliseconds $CopyDelayMs
            [System.Windows.Forms.SendKeys]::SendWait("^c")

            if ($AppendMode) {
                Start-Sleep -Milliseconds 80
                $text = [System.Windows.Forms.Clipboard]::GetText()

                if ($StripStandaloneNumberLines) {
                    $text = Remove-StandaloneNumberLines $text
                }

                if (-not [string]::IsNullOrEmpty($text)) {
                    if ($copyBuffer.Length -gt 0) {
                        $copyBuffer += [Environment]::NewLine
                    }

                    $copyBuffer += $text
                    [System.Windows.Forms.Clipboard]::SetText($copyBuffer)
                    Write-Host ("Appended {0} chars. Buffer: {1} chars." -f $text.Length, $copyBuffer.Length)
                }
            }
        }

        $dragStart = $null
    }

    if ($PasteOnMiddleClick -and $middleDown -and -not $wasMiddleDown) {
        if ($AppendMode -and $copyBuffer.Length -gt 0) {
            [System.Windows.Forms.Clipboard]::SetText($copyBuffer)
        }

        [System.Windows.Forms.SendKeys]::SendWait("^v")
    }

    $escapeDown = Test-KeyDown $VK_ESCAPE
    if ($AppendMode -and $escapeDown -and -not $wasEscapeDown) {
        $copyBuffer = ""
        [System.Windows.Forms.Clipboard]::Clear()
        Write-Host "Copy buffer cleared."
    }

    $wasLeftDown = $leftDown
    $wasMiddleDown = $middleDown
    $wasEscapeDown = $escapeDown
}
