<template>
  <div class="login-container">
    <van-nav-bar class="app-nav-bar" title="登录/注册" left-arrow @click-left="$router.back()" />
    <van-form ref="loginForm" @submit="onLogin" :show-error-message="false" @failed="onFailed" :show-error="false" :validate-first="true">
      <van-field name="mobile" v-model="user.mobile" icon-prefix="icon" left-icon="shouji iconfont" placeholder="请输入手机号" :rules="formRules.mobile" />
      <van-field name="code" v-model="user.code" clearable icon-prefix="icon" left-icon="yanzhengma iconfont" placeholder="请输入验证码" :rules="formRules.code">
        <template #button>
          <van-count-down @finish="isCountDownShow = false" v-if="isCountDownShow" :time="1000 * 60" format="ss s" />
          <van-button :loading="isSendSmsLoading" v-else @click.prevent="onsendSms" class="send-btn" size="small" round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button round class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    // 登录
    async onLogin() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        if (res.data.message === 'OK') {
          this.$toast.success('登录成功')
        }
      } catch (error) {
        this.$toast.fail('登录失败,手机号或验证码错误')
      }
    },
    // 失败
    onFailed(e) {
      if (e.errors) {
        this.$toast({
          message: e.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onsendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
        this.isSendSmsLoading = true
        const res = await sendSms(this.user.mobile)
        console.log(res.data)

        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '验证码发送频繁，请稍后再试'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，请稍后再试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    width: 85px;
    height: 28px;
    line-height: 28px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
  .login-btn-wrap {
    margin: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
