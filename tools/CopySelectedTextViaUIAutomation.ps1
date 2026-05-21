param(
    [int]$DelaySeconds = 0
)

Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type -AssemblyName System.Windows.Forms

if ($DelaySeconds -gt 0) {
    Write-Host ("Waiting {0} seconds. Focus the target app and select the text now..." -f $DelaySeconds)
    Start-Sleep -Seconds $DelaySeconds
}

function Get-TextFromRange($range) {
    if ($null -eq $range) {
        return ""
    }

    try {
        return $range.GetText(-1)
    } catch {
        return ""
    }
}

function Get-TextPattern($element) {
    if ($null -eq $element) {
        return $null
    }

    $pattern = $null
    $hasTextPattern = $element.TryGetCurrentPattern(
        [System.Windows.Automation.TextPattern]::Pattern,
        [ref]$pattern
    )

    if ($hasTextPattern -and $null -ne $pattern) {
        return $pattern
    }

    return $null
}

function Get-TextFromPattern($pattern) {
    if ($null -eq $pattern) {
        return ""
    }

    $text = ""

    try {
        $selection = $pattern.GetSelection()
        if ($selection -and $selection.Length -gt 0) {
            $parts = New-Object System.Collections.Generic.List[string]
            foreach ($range in $selection) {
                $part = Get-TextFromRange $range
                if (-not [string]::IsNullOrEmpty($part)) {
                    [void]$parts.Add($part)
                }
            }

            $text = [string]::Join([Environment]::NewLine, $parts)
        }
    } catch {
        $text = ""
    }

    if ([string]::IsNullOrEmpty($text)) {
        try {
            $text = $pattern.DocumentRange.GetText(-1)
        } catch {
            $text = ""
        }
    }

    return $text
}

$focused = [System.Windows.Automation.AutomationElement]::FocusedElement
if ($null -eq $focused) {
    Write-Error "Focused element was not found."
    exit 1
}

$candidates = New-Object System.Collections.Generic.List[System.Windows.Automation.AutomationElement]
[void]$candidates.Add($focused)

$walker = [System.Windows.Automation.TreeWalker]::ControlViewWalker
$parent = $focused
for ($i = 0; $i -lt 8; $i++) {
    try {
        $parent = $walker.GetParent($parent)
    } catch {
        $parent = $null
    }

    if ($null -eq $parent) {
        break
    }

    [void]$candidates.Add($parent)
}

$text = ""
$matched = $false

foreach ($candidate in $candidates) {
    $pattern = Get-TextPattern $candidate
    $text = Get-TextFromPattern $pattern
    if (-not [string]::IsNullOrEmpty($text)) {
        $matched = $true
        break
    }
}

if (-not $matched) {
    $condition = [System.Windows.Automation.Condition]::TrueCondition
    foreach ($candidate in $candidates) {
        try {
            $children = $candidate.FindAll(
                [System.Windows.Automation.TreeScope]::Descendants,
                $condition
            )
        } catch {
            continue
        }

        foreach ($child in $children) {
            $pattern = Get-TextPattern $child
            $text = Get-TextFromPattern $pattern
            if (-not [string]::IsNullOrEmpty($text)) {
                $matched = $true
                break
            }
        }

        if ($matched) {
            break
        }
    }
}

if ([string]::IsNullOrEmpty($text)) {
    Write-Error "No selected text or document text could be read from UI Automation around the focused element."
    exit 1
}

[System.Windows.Forms.Clipboard]::SetText($text)
Write-Host ("Copied {0} chars to clipboard via UI Automation." -f $text.Length)
