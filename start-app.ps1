param(
  [switch]$SkipMySql
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $root "E-Commerce-Backend"
$frontendPath = Join-Path $root "Frontend"

function Ensure-NodeModules {
  param([string]$PathToCheck)
  $nodeModules = Join-Path $PathToCheck "node_modules"
  if (-not (Test-Path $nodeModules)) {
    Write-Host "Installing dependencies in $PathToCheck ..."
    Push-Location $PathToCheck
    try {
      npm install
    }
    finally {
      Pop-Location
    }
  }
}

function Start-MySqlService {
  if ($SkipMySql) {
    Write-Host "Skipping MySQL startup as requested."
    return
  }

  $serviceCandidates = @("MySQL80", "MySQL", "mysql")
  $service = $null
  foreach ($name in $serviceCandidates) {
    $found = Get-Service -Name $name -ErrorAction SilentlyContinue
    if ($found) {
      $service = $found
      break
    }
  }

  if (-not $service) {
    $wildcard = Get-Service -Name "*mysql*" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($wildcard) {
      $service = $wildcard
    }
  }

  if (-not $service) {
    Write-Warning "No MySQL Windows service found. Start MySQL manually (or use -SkipMySql)."
    return
  }

  if ($service.Status -ne "Running") {
    Write-Host "Starting MySQL service: $($service.Name)"
    Start-Service -Name $service.Name
  }
  else {
    Write-Host "MySQL service already running: $($service.Name)"
  }
}

Write-Host "Starting full app from: $root"
Start-MySqlService
Ensure-NodeModules -PathToCheck $backendPath
Ensure-NodeModules -PathToCheck $frontendPath

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd `"$backendPath`"; npm start"
)

Start-Process powershell -ArgumentList @(
  "-NoExit",
  "-Command",
  "cd `"$frontendPath`"; npm start"
)

Start-Sleep -Seconds 4
Start-Process "http://localhost:3001"

Write-Host "Backend and frontend started in new terminals."
Write-Host "Opened http://localhost:3001 in your browser."
