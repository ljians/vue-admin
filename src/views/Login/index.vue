<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item of menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMneu(item)"> {{item.txt}} </li>
      </ul>
      <!-- 表单start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">

        <el-form-item prop="username" class="item-form">
          <label for="">邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="">密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="menuTab[1].current">
          <label for="">确认密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="mobCode" class="item-form">
          <label for="">验证码</label>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model.number="ruleForm.mobCode"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
          
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn block" type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stripscript, validateEmail, validatePwd, validateMCode } from '@/utils/validate'
import { reactive } from '@vue/composition-api'
export default {
  name: 'login',
  setup(props, context) {
    // 这里放置date数据、生命周期函数、自定义的函数
    /**
     * 声明数据
     */
    const menuTab = reactive([
      { txt: '登录', current: true },
      { txt: '注册', current: false }
    ])
    // 表单绑定数据
    const ruleForm =reactive({
      username: '',
      password: '',
      passwords: '',
      mobCode: ''
    })
    // 表单的验证
    const rules = reactive({
      username: [
        { validator: validateUserName, trigger: 'blur' }
      ],
      password: [
        { validator: validatePassword, trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePasswords, trigger: 'blur' }
      ],
      mobCode: [
        { validator: validateMobCode, trigger: 'blur' }
      ]
    })

    /**
     * 声明函数
     */
    // 切换登录、注册
    const toggleMneu = (data => {
      menuTab.forEach((elem, index) => {
        elem.current = false
      });
      // 显示高光
      data.current = true;
    })
    // 表单方法
    const submitForm = (formName => {
      context.refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    })

    // 邮箱验证
    let validateUserName = (rule, value, callback) => { 
      if (value === '') {
        callback(new Error('请输入用户邮箱'));
      }else if(validateEmail(value)) {
        callback(new Error('您输入的邮箱格式错误, 请输入正确的邮箱!'))
      } else {
        callback();
      }
    };

    // 密码验证
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value)
      value = ruleForm.password
      
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (validatePwd(value)) {
        callback(new Error('密码由6-20位的数字和字母组成!'));
      } else {
        callback();
      }
    };

    // 重复密码验证
    let validatePasswords = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.passwords = stripscript(value)
      value = ruleForm.passwords
      
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== ruleForm.password) {
        callback(new Error('两次密码输入不一样!'));
      } else {
        callback();
      }
    };

    // 验证验证码
    let validateMobCode = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.mobCode = stripscript(value)
      value = ruleForm.mobCode

      if (value === '') {
        return callback(new Error('验证码不能为空!'));
      }else if(validateMCode(value)) {
        return callback(new Error('验证码格式错误!'))
      }else {
        callback()
      } 
    }

    return {
      menuTab,
      ruleForm,
      rules,

      toggleMneu,
      submitForm
    }
  }
}
</script>
<style lang='scss' scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, .1);
  }
}
.login-form {
  label {
    display: block;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19pxss;
  }
}
</style>