# Recalcula un .xlsx con Excel (COM) y busca errores de fórmula en todas las hojas.
param([Parameter(Mandatory = $true)][string]$Path)

$full = (Resolve-Path $Path).Path
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
try {
  $wb = $excel.Workbooks.Open($full)
  $excel.CalculateFullRebuild()
  $errors = @()
  $formulas = 0
  foreach ($ws in $wb.Worksheets) {
    $used = $ws.UsedRange
    foreach ($cell in $used.Cells) {
      if ($cell.HasFormula) {
        $formulas++
        $v = $cell.Text
        if ($v -match '^#(REF|DIV/0|VALUE|N/A|NAME|NUM|NULL)') {
          $errors += "$($ws.Name)!$($cell.Address($false,$false)) = $v"
        }
      }
    }
  }
  $wb.Save()
  $wb.Close($true)
  if ($errors.Count -gt 0) { "ERRORS ($($errors.Count)):"; $errors } else { "OK: 0 errores en $formulas formulas." }
} finally {
  $excel.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel) | Out-Null
}
