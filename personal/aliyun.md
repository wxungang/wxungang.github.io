## 阿里云

### root/ 默认下载目录
- containerd.io-1.4.3-3.1.el7.x86_64.rpm

### 已安装环境
- git
```
yum install git
```
- nvm
```
// 使用git将源码克隆到本地的~/.nvm目录下，并检查最新版本。
git clone https://github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`

// 激活NVM。
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile

```

- nodeJs
```
// 通过 nvm 安装管理
nvm install v14.15.4

```

- docker : 参考阿里云官方
```
// 1.  安装Docker的依赖库。
yum install -y yum-utils device-mapper-persistent-data lvm2

// 2.  添加Docker CE的软件源信息。
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

// 3.  安装Docker CE。
yum makecache fast
yum -y install docker-ce


// 3.  安装Docker CE。（centos 8.0）
// 如果报错：说明centos8没有该参数，解决办法为：去掉fast参数，就可以了
yum makecache 

// 如果报错需要手动安装rpm 包
// Problem: package docker-ce-3:18.09.9-3.el7.x86_64 requires containerd.io >= 1.2.2-3, but none of the providers can be installed

// 获取rpm包
wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.4.3-3.1.el7.x86_64.rpm

// 升级containerd.io（安装rpm包）
yum -y install ./containerd.io-1.4.3-3.1.el7.x86_64.rpm

// 安装 docker-ce 社区版本
yum -y install docker-ce

// 4.  启动Docker服务。
systemctl start docker

// 其它:更多命令查看docker官网

// 停止服务 
systemctl stop docker

```

