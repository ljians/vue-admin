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
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
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
export default {
  name: 'login', 
  data() {
    // 邮箱验证
    var validateUserName = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\_)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value === '') {
        callback(new Error('请输入用户邮箱'));
      }else if(!reg.test(value)) {
        callback(new Error('您输入的邮箱格式错误, 请输入正确的邮箱!'))
      } else {
        callback();
      }
    };
    // 密码验证
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/

      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码由6-20位的数字和字母组成!'));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateMobCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/

      if (value === '') {
        return callback(new Error('验证码不能为空!'));
      }else if(!reg.test(value)) {
        return callback(new Error('验证码格式错误!'))
      }else {
        callback()
      } 
    };
    return {
      menuTab: [
        { txt: '登录', current: true },
        { txt: '注册', current: false }
      ],
      ruleForm: {
        username: '',
        password: '',
        mobCode: ''
      },
      rules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        mobCode: [
          { validator: validateMobCode, trigger: 'blur' }
        ]
      }
    };
  },
  // 方法
  methods: {
    toggleMneu(data) {
      this.menuTab.forEach((elem, index) => {
        elem.current = false
      });
      // 显示高光
      data.current = true;
    },
    // 表单方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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