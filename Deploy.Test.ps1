$Credential = Get-Credential -UserName "Administrator" -Message "请输入部署服务器的用户名和密码"
$SessionOption = New-PSSessionOption -SkipCACheck -SkipCNCheck -SkipRevocationCheck
$Session = New-PSSession -ComputerName 10.76.99.18 -Port 5985 -Credential $Credential -UseSSL:$false -SessionOption $SessionOption
Start-DeployIIS -Session $Session -WebSiteName WMSDoc -WebSitePort 80 -ScriptBlock {
    npm run docs:build
} -OutputPath .\docs\.vitepress\dist\ -RemotePath "D:\Publish\"
Remove-PSSession -Session $Session