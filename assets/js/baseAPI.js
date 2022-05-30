$.ajaxPrefilter((options) => {
    // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
    // 会先调用 ajaxPrefilter 这个函数
    // 在这个函数中，可以拿到我们给Ajax提供的配置对象
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = `http://www.liulongbin.top:3007`+options.url;
    // 为 /my/ 相关接口 注入 token
    if(options.url.includes('/my/')) {
        options.headers = {
            Authorization:localStorage.getItem('token'),
        };
    };
    //每次发生请求回来校验 token 是否存在，或者是否过期
    options.complete = res => {
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空
            localStorage.removeItem('token');
            //强制跳转到登录页面
            location.href = '/login.html';
        }
    };
});