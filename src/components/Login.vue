<template>
  <div class="login_container">
    <div class="box">
      <!-- 头像区域 -->
      <div class="avatar_img">
        <img src="~@/assets/img/logo.png" alt="" srcset="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="form" :rules="from_rules" label-width="0px" class="from_login">
      <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="iconfont icon-mima"></el-input>
        </el-form-item>
       <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="iconfont icon-yonghuming"></el-input>
        </el-form-item>
      <!-- 登录按钮 -->
        <el-form-item >
          <el-button type="primary medium" size="medium" @click="login">登录</el-button>
          <el-button type="info" size="medium"  @click="refFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import {getLogindata} from '@/network/login.js'

export default {
  name:'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      from_rules: {
      username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
      password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
    }
    }
  },
  methods: {
  //一般方法
    //重置表单
    refFrom() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      //登录验证
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          //验证通过>网络请求
          getLogindata(this.form).then(res => {
            // console.log(res);
              if (res.meta.status !== 200) {
                this.$message.error('登录失败')
              } else {
                  window.sessionStorage.setItem('token', res.data.token)
                  this.$router.push('/home')
              }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login_container {
  background:rgba(244,246,252,1);
  height: 100%;
  position: relative;
}
.box{
  width: 440px;
  height: 300px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  box-shadow:0px 2px 16px 0px rgba(0,0,0,0.07);

  .avatar_img{
  width: 160px;
  margin: 0 auto;
  margin-top: -100px;

  img{
  width: 100%;
  }
}

}

.from_login{
  position: absolute;
  top: 50px;
  width: 100%;
  padding: 0 18px;
  box-sizing: border-box;
}


</style>>



