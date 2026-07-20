# WMS软件内部测试报告-统信UOS V20系统适配

> 项目：仓库管理系统（ZEQP.WMS）<br>
> 服务器：统信UOS，IP `10.76.40.211`<br>
> 编写日期：2026-07-15

---

## 一、环境信息

| 组件       | 版本/说明                                                    |
| ---------- | ------------------------------------------------------------ |
| 操作系统   | 统信 UOS V20（基于 Debian，内核 Linux）                      |
| 后端 API   | .NET 8 SDK (如果是 SCD方式打包 自包含运行时，无需安装 .NET 运行时) |
| 后端 DI    | .NET 8 SDK (如果是 SCD方式打包 自包含运行时，无需安装 .NET 运行时) |
| Web 服务器 | Nginx                                                        |
| 数据库     | SQL Server，IP `10.76.99.19`，库名 `24CTSIL004`               |
| 授权机器名 | `CTR-SERVER193`                                              |

---

## 二、前置准备（首次部署执行一次）

### 2.1 安装系统底层依赖

本项目支持两种打包部署方式：

| 方式    | 全称                                           | 说明                                                         |
| ------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **FDD** | Framework-Dependent Deployment（框架依赖部署） | 程序本身不含 .NET 运行时，发布包体积小；服务器上必须提前安装对应版本的 .NET 运行时才能运行 |
| **SCD** | Self-Contained Deployment（自包含部署）        | .NET 运行时随程序一起打包发布，服务器无需安装任何 .NET 环境；发布包体积较大，但部署环境更简洁 |

无论哪种方式，Linux 上运行都依赖系统原生的加密库和国际化库，需要提前安装。

```bash
# 更新本地软件包索引，确保后续安装的是最新版本
sudo apt update

# libssl1.1：SSL/TLS 加密库，程序建立加密连接时依赖此库
# libicu-dev：Unicode 国际化支持库，.NET 处理中文字符串和日期格式时依赖
# -y 参数：自动确认，跳过手动输入 y 的步骤
sudo apt install libssl1.1 libicu-dev -y
```

> **【仅 FDD 需要】** 安装 .NET 8 运行时：
>
> ```bash
> sudo apt install dotnet-runtime-8.0 -y
> ```
>
> **【SCD 跳过此步】** 运行时已内置在发布包中，无需安装。

### 2.2 创建部署目录

提前创建好所有需要用到的目录，后续上传文件时直接往对应目录放置。需要创建的目录如下：

| 测试目录路径          | 用途                             |
| --------------------- | -------------------------------- |
| `/opt/wms/upload`     | 程序运行时上传附件的存放目录     |
| `/opt/wms/certs`      | HTTPS 证书文件存放目录           |
| `/opt/wms/Giant.Api`  | 后端 API 服务的程序文件目录      |
| `/opt/wms/Giant.DI`   | 后端 DI 集成服务的程序文件目录   |
| `/opt/wms/web/wmsweb` | WMSWeb 电脑端前端静态文件目录    |
| `/opt/wms/web/wmssrf` | WMSSRF RF 手持端前端静态文件目录 |

**命令行创建或打开统信 UOS 文件管理器，进入部署文件的目录创建**

```bash
# -p 参数：父目录不存在时一并创建，目录已存在时不报错
sudo mkdir -p  /opt/wms/Giant.Api（文件路径）
```

## 三、Nginx部署

### 3.1 安装

```bash
sudo apt install nginx -y
```

验证安装成功：

```bash
nginx -v
```

![alt text](nginx版本验证.png){widtn:300px}

### 3.2 设置开机自启并启动

```bash
# 设置开机自启
sudo systemctl enable nginx
# 立即启动
sudo systemctl start nginx
```

验证启动成功（显示 `active (running)` 即正常）：

```bash
sudo systemctl status nginx
```

![alt text](Nginx服务启动成功.png){widtn:300px}


### 3.3 配置文件说明

| 路径                        | 说明                                     |
| --------------------------- | ---------------------------------------- |
| `/etc/nginx/nginx.conf`     | 主配置文件，一般不需要修改               |
| `/etc/nginx/conf.d/`        | 自定义站点配置目录，本项目的配置放在此处 |
| `/var/log/nginx/access.log` | 访问日志                                 |
| `/var/log/nginx/error.log`  | 错误日志，排查问题时首先查看此文件       |

### 3.4 常用管理命令

```bash
# 校验配置语法（修改配置后先执行，有错误会提示具体行号）
sudo nginx -t

# 重载配置（配置正确后执行，不中断现有连接）
sudo systemctl reload nginx

# 查看运行状态
sudo systemctl status nginx

# 重启
sudo systemctl restart nginx

# 停止
sudo systemctl stop nginx
```

> 修改 `/etc/nginx/conf.d/` 下的配置文件后，务必先执行 `sudo nginx -t` 校验语法，再执行 `sudo systemctl reload nginx` 使其生效。

---

## 四、后端部署

### 4.1 授权配置

> ⚠️ 注意：授权文件绑定了机器名，服务器主机名必须与授权登记一致，否则所有接口返回 ErrorCode 601。

授权文件路径：`/opt/wms/Giant.Api/WMS.Production.lic`（随程序文件一起部署），授权机器名为 `CTR-SERVER193`。

检查并设置主机名：

```bash
# 查看当前主机名
hostname

# 如不是 CTR-SERVER193，执行以下命令永久修改（重启后依然生效）
sudo hostnamectl set-hostname CTR-SERVER193

# 修改后验证是否生效
hostname
```

### 4.2 数据库连接配置 
> 只需要先把 `ZEQP_Root_CA` 根证书导入系统信任库，SQL Server 证书链就会被正常信任。
```bash
# 将 ZEQP_Root_CA 根证书安装到系统信任库
sudo cp ZEQP_Root_CA.crt /usr/local/share/ca-certificates/ZEQP_Root_CA.crt
sudo update-ca-certificates
```
证书安装完成后，重启 API 服务即可生效：
```bash
sudo systemctl restart giant-api
```

### 4.3 跨域配置

配置文件路径：`/opt/wms/Giant.Api/appsettings.Production.json`（同上文件）

前端访问后端接口时，后端需要允许前端域名跨域，否则浏览器拦截请求。

```json
"AllowedOrigins": [
  "http://10.76.40.211:8000",
  "http://10.76.40.211:8080"
]
```

> 修改配置后必须重启 API 服务才能生效。

### 4.4 DI 服务 HTTPS 证书配置

DI 服务配置了 HTTPS，Linux 不支持从 Windows 证书存储（LocalMachine\My）加载证书，需改为 pfx 文件方式。

**生成自签名证书（首次部署执行）：**

```bash
# 创建证书存放目录
mkdir -p /opt/wms/certs

# 生成自签名证书（有效期 10 年）
# -x509：直接输出证书而非证书请求
# -newkey rsa:4096：同时生成 4096 位 RSA 私钥
# -keyout：私钥输出路径
# -out：证书输出路径
# -days 3650：有效期 3650 天（约 10 年）
# -nodes：私钥不加密（服务启动时无需手动输入密码）
# -subj：证书主题，CN 填服务器主机名
openssl req -x509 -newkey rsa:4096 -keyout /opt/wms/certs/kestrel.key \
  -out /opt/wms/certs/kestrel.crt -days 3650 -nodes \
  -subj "/CN=CTR-SERVER193"

# 将私钥和证书合并为 pfx 格式（Kestrel 加载证书需要此格式）
# -export：导出为 PKCS#12（.pfx）格式
# -passout pass:xxx：设置 pfx 文件的保护密码
openssl pkcs12 -export -out /opt/wms/certs/kestrel.pfx \
  -inkey /opt/wms/certs/kestrel.key \
  -in /opt/wms/certs/kestrel.crt \
  -passout pass:zeqp@2025

# 设置目录权限，确保服务进程可读取
sudo chmod 755 /opt/wms/certs -R

# 验证证书文件已生成（应看到 kestrel.key、kestrel.crt、kestrel.pfx）
ls -l /opt/wms/certs/
```

![alt text](生成自签名证书.png){width:300px}

**修改 DI 配置文件** `/opt/wms/Giant.DI/appsettings.Production.json`（DI 服务的生产环境配置），将证书节点改为：

```json
"Certificates": {
  "Default": {
    "Path": "/opt/wms/certs/kestrel.pfx",
    "Password": "zeqp@2025"
  }
}
```

### 4.5 部署 API 服务文件

将编译好的 API 程序文件通过文件管理器手动上传（或复制粘贴）到目标部署目录 `/opt/wms/Giant.Api/`。

上传完成后，赋予主程序可执行权限（ SCD 需要，否则服务无法启动，FDD打包不需要）：

```bash
sudo chmod +x /opt/wms/Giant.Api/Giant.Api
```

### 4.6 部署 DI 服务文件

将编译好的 DI 程序文件通过文件管理器手动上传（或复制粘贴）到目标部署目录 `/opt/wms/Giant.DI/`。

上传完成后，赋予主程序可执行权限（SCD 需要，FDD打包不需要）：

```bash
sudo chmod +x /opt/wms/Giant.DI/Giant.DI
```

---

## 五、注册后端服务（Systemd）

将两个后端服务注册为系统服务，实现开机自启、后台常驻、崩溃自动重启。

### 5.1 停止手动启动的进程（避免端口冲突）

如果之前手动测试运行过程序，注册服务前需要先停掉，否则端口被占用导致服务启动失败。

```bash
# -f 参数：按进程名模糊匹配并终止（如果没有匹配到进程会提示无进程，属正常）
sudo pkill -f Giant.Api
sudo pkill -f Giant.DI
```

### 5.2 创建 API 服务文件

使用 `tee` 命令将服务配置写入 systemd 目录：

```bash
sudo tee /etc/systemd/system/giant-api.service > /dev/null << 'EOF'
[Unit]
# 服务描述，显示在 systemctl status 中
Description=Giant WMS API Service
# 等待网络就绪后再启动，确保数据库连接不会因网络未通而失败
After=network.target

[Service]
# 工作目录，程序运行时的当前路径（读取 appsettings.json、lic 文件等基于此路径）
WorkingDirectory=/opt/wms/Giant.Api
# 启动命令，--urls 指定监听地址和端口（0.0.0.0 表示监听所有网卡）
# SCD 方式：直接运行可执行文件（如下）
# FDD 方式：改为 ExecStart=/usr/bin/dotnet /opt/wms/Giant.Api/Giant.Api.dll --urls "http://0.0.0.0:8075"
ExecStart=/opt/wms/Giant.Api/Giant.Api --urls "http://0.0.0.0:8075"
# 进程异常退出时自动重启
Restart=always
# 重启间隔 5 秒，避免频繁重启占用资源
RestartSec=5
# 以 root 用户运行（需要访问证书等受限文件）
User=root
# 设置环境变量，程序据此加载 appsettings.Production.json
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
# 系统进入多用户模式时自动启动此服务（即开机自启）
WantedBy=multi-user.target
EOF
```

### 5.3 创建 DI 服务文件

```bash
sudo tee /etc/systemd/system/giant-di.service > /dev/null << 'EOF'
[Unit]
Description=Giant DI Service
After=network.target

[Service]
WorkingDirectory=/opt/wms/Giant.DI
# DI 服务的监听端口和协议在 appsettings 中配置，此处无需指定 --urls
# SCD 方式：直接运行可执行文件（如下）
# FDD 方式：改为 ExecStart=/usr/bin/dotnet /opt/wms/Giant.DI/Giant.DI.dll
ExecStart=/opt/wms/Giant.DI/Giant.DI
Restart=always
RestartSec=5
User=root
Environment=ASPNETCORE_ENVIRONMENT=Production

[Install]
WantedBy=multi-user.target
EOF
```

### 5.4 启动并设置开机自启

```bash
# 重新加载 systemd 配置（新增或修改 .service 文件后必须执行）
sudo systemctl daemon-reload

# 设置开机自启（enable 只是注册自启，不会立即启动）
sudo systemctl enable giant-api
sudo systemctl enable giant-di

# 立即启动服务
sudo systemctl start giant-api
sudo systemctl start giant-di

# 验证运行状态（显示 active (running) 即为成功）
systemctl status giant-api
systemctl status giant-di
```

![alt text](服务注册成功照片.png){width:300px}

---

## 六、前端部署（Nginx 配置）

打开统信 UOS 文件管理器进入 `/etc/nginx/conf.d/` 目录，新建新建并编辑 Nginx 站点配置文件（`wms.conf` ）（需管理员权限）
或者通过命令行方式如下：

```bash
sudo nano /etc/nginx/conf.d/wms.conf
```

写入以下内容：

```nginx
# WMSWeb 电脑端
server {
    listen 8000;                    # 监听端口（WMSWeb 电脑端访问端口）
    server_name _;                  # 匹配所有域名/IP
    root /opt/wms/web/wmsweb;       # 前端静态文件存放路径（WMSWeb 打包产物上传到此目录）
    index index.html;               # 默认首页文件

    location / {
        try_files $uri $uri/ /index.html;   # Vue 单页应用路由支持（刷新不 404）
        gzip on;                             # 开启 gzip 压缩，减少传输体积
        gzip_types text/plain application/javascript text/css application/json;

        location ~* \.(js|css|png|jpg|ico|svg|woff|woff2)$ {
            expires 7d;                      # 静态资源缓存 7 天
            add_header Cache-Control "public, immutable";
        }
    }
}

# WMSSRF RF手持端
server {
    listen 8080;                    # 监听端口（WMSSRF RF手持端访问端口）
    server_name _;                  # 匹配所有域名/IP
    root /opt/wms/web/wmssrf;       # 前端静态文件存放路径（WMSSRF 打包产物上传到此目录）
    index index.html;               # 默认首页文件

    location / {
        try_files $uri $uri/ /index.html;   # Vue 单页应用路由支持（刷新不 404）
        gzip on;
        gzip_types text/plain application/javascript text/css application/json;

        location ~* \.(js|css|png|jpg|ico|svg|woff|woff2)$ {
            expires 7d;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

验证并重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 七、防火墙配置（UFW）

```bash
# 安装 UFW
sudo apt install ufw -y

# 先放行 SSH 避免断连
sudo ufw allow 22/tcp
# 放行前端端口
sudo ufw allow 8000/tcp
sudo ufw allow 8080/tcp
# 放行后端端口
sudo ufw allow 8075/tcp
sudo ufw allow 8053/tcp

# 启用防火墙
sudo ufw enable

# 查看当前规则
sudo ufw status
```

---

## 八、访问地址

| 系统             | 地址                             | 说明                  |
| ---------------- | -------------------------------- | --------------------- |
| WMSWeb 电脑端    | http://10.76.40.211:8000         | PC 端仓库管理操作界面 |
| WMSSRF RF手持端  | http://10.76.40.211:8080         | 手持终端扫码作业界面  |
| API Swagger 文档 | http://10.76.40.211:8075/swagger | 后端接口在线调试文档  |
| DI 服务          | https://10.76.40.211:8053        | 数据集成服务（HTTPS） |

![alt text](截图_org.deepin.browser_20260716095823.png){width:300px}
>
![alt text](截图_选择区域_20260716095910.png){width:300px}
>
![alt text](截图_选择区域_20260716095946.png){width:300px}
>
![alt text](截图_org.deepin.browser_20260716095955.png){width:300px}

---

## 九、客户端兼容性测试

在统信 UOS 服务器本机使用不同浏览器，对 WMSWeb 电脑端（`http://10.76.40.211:8000`）进行登录、查询等基础网页操作测试。

| 序号 | 客户端操作系统 | 浏览器                 | 适配测试方法                     | 测试结果 |
| ---- | -------------- | ---------------------- | -------------------------------- | -------- |
| 1    | 统信 UOS V20   | Google Chrome         | 网页操作测试，如登陆、查询等操作 | ✅ 正常   |
| 2    | 统信 UOS V20   | 统信浏览器（系统自带）  | 网页操作测试，如登陆、查询等操作 | ✅ 正常   |

1.Google Chrome 登录成功页面:
![alt text](截图_google-chrome_20260716100439.png){width:300px}
![alt text](截图_google-chrome_20260716100429.png){width:300px}

2.统信浏览器（系统自带）登录成功页面
![alt text](截图_org.deepin.browser_20260716095851.png){width:300px}
![alt text](截图_选择区域_20260716095921.png){width:300px}

---

## 十、版本更新流程

以 API 为例，DI 替换对应名称即可。

### 步骤 1：停止服务

```bash
sudo systemctl stop giant-api
```

### 步骤 2：覆盖新文件

**方式一：命令行操作**

```bash
# /path/to/new/ 为新版本文件的实际路径（U盘更新文件路径）    /opt/wms/Giant.Api/为部署文件的路径
sudo cp -r /path/to/new/Giant.Api/* /opt/wms/Giant.Api/
# 赋予可执行权限（SCD打包方式每次覆盖文件后都需要重新赋权）
sudo chmod +x /opt/wms/Giant.Api/Giant.Api
```

**方式二：可视化文件管理器操作**

1. 打开统信 UOS 文件管理器，导航到 `文件位置`

2. 将新版本文件全选复制，粘贴到该目录，选择"全部替换"

3. 替换完成后，仍需在终端执行赋权命令（文件管理器无法设置可执行权限）：

   ```bash
   sudo chmod +x /opt/wms/Giant.Api/Giant.Api
   ```

### 步骤 3：启动服务并验证

```bash
sudo systemctl start giant-api
sudo systemctl status giant-api
```

---

## 十一、日常运维命令

### 服务管理

```bash
# 重启服务
sudo systemctl restart giant-api
sudo systemctl restart giant-di

# 查看实时日志
journalctl -u giant-api -f
journalctl -u giant-di -f

# 查看端口监听
ss -tlnp | grep -E '8075|8053'
```

### Nginx 管理

```bash
sudo systemctl reload nginx    # 修改配置后重载
sudo systemctl restart nginx   # 重启
sudo nginx -t                  # 校验配置语法
systemctl status nginx         # 查看状态
```

### 防火墙管理

```bash
sudo ufw status                # 查看规则
sudo ufw allow 端口/tcp        # 放行端口
sudo ufw delete allow 端口/tcp # 删除规则
sudo ufw reload                # 重载规则
```

---

## 十二、常见问题排查

### ErrorCode 601 授权机器名不正确

```bash
hostname
sudo hostnamectl set-hostname CTR-SERVER193
sudo systemctl restart giant-api
```

### SQL Server 连接失败

先确认 `ZEQP_Root_CA` 根证书是否已经导入系统信任库，再检查网络连通性：

```bash
nc -zv 10.76.99.19 1433
```

### CORS 跨域错误

检查 `appsettings.Production.json` 中 `AllowedOrigins` 是否包含前端地址，修改后重启 API：

```bash
sudo systemctl restart giant-api
```

### DI 服务启动失败（Unix X509Store 错误）

确认证书配置使用的是 pfx 文件路径：

```json
"Certificates": {
  "Default": {
    "Path": "/opt/wms/certs/kestrel.pfx",
    "Password": "zeqp@2025"
  }
}
```

### 前端页面显示异常

清除浏览器缓存：`Ctrl + Shift + R`，或开无痕窗口重新访问。

### API 启动报错：The path must be absolute

错误信息：
```json
Unhandled exception. System.ArgumentException: The path must be absolute. (Parameter 'root')
   at Microsoft.Extensions.FileProviders.PhysicalFileProvider..ctor(String root, ExclusionFilters filters)
   at Giant.Api.Program.Main(String[] args) in Program.cs:line 204
已放弃 (核心已转储)
```

原因：`appsettings.Production.json` 中存在 Windows 格式的路径（如 `E:\\wms\\upload`），未改为 Linux 绝对路径。

找到相关路径配置项，改为 Linux 格式：

```json
"UploadPath": "/opt/wms/upload"
```

修改完成后重新运行服务即可。
