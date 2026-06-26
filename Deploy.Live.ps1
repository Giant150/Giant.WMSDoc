$Credential = Get-Credential -UserName "Administrator" -Message "请输入部署服务器的用户名和密码"
$SessionOption = New-PSSessionOption -SkipCACheck -SkipCNCheck -SkipRevocationCheck
$Session = New-PSSession -ComputerName 10.88.19.3 -Port 5986 -Credential $Credential -UseSSL -SessionOption $SessionOption
Start-DeployIIS -Session $Session -WebSiteName WMSDoc -WebSitePort 80 -ScriptBlock {
    npm run docs:build
} -OutputPath .\docs\.vitepress\dist\ -RemotePath "D:\Publish\"
Remove-PSSession -Session $Session