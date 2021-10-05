### 记录步骤

- Q1.写完文件直接执行
```
code: 'MODULE_NOT_FOUND',
```
- A1.很明显 缺少mysql模块依赖
#### 1.npm切换淘宝镜像
```
npm config set registry https://registry.npm.taobao.org/
```
#### 2.安装mysql依赖
```
npm install mysql
```
#### 3.执行index.js
```
node .\index.js
```
- Q2.执行后报错如下：
```
Error: getaddrinfo ENOTFOUND http://81.68.164.136/
{
  errno: -3008,
  code: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'http://81.68.164.136/',
  fatal: true
}
```
- A2.createConnection方法中 host 写域名或者服务器 IP 即可
- Q3.修改好了 host 依旧报错如下：

```
Error: connect ETIMEDOUT
{
  errorno: 'ETIMEDOUT',
  code: 'ETIMEDOUT',
  syscall: 'connect',
  fatal: true
}
```
- A3.服务器端口未开放（MySQL默认端口为3306）
- Q4.已在防火墙中开放端口，依旧报错如下：
```
Error: ER_HOST_NOT_PRIVILEGED: Host '223.166.104.151' is not allowed to connect to this MySQL server
{
  code: 'ER_HOST_NOT_PRIVILEGED',
  errno: 1130,
  sqlMessage: "Host '223.166.104.151' is not allowed to connect to this MySQL server",
  sqlState: undefined,
  fatal: true
}
```
- A4.这是由于MySQL配置了不支持远程连接引起的,需要连接服务器进行如下配置（需登陆 root 账号）：
```
mysql -u root -p
use mysql;
select host from user where user='root';
update user set host = '%' where user ='root';
// 如果 Host = '%'，表示所有 IP 都有连接权限，实际应根据生产环境的 IP 进行设置
flush privileges;
```
#### 4.至此，便完成了连接