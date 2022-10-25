<template>
  <div class="form-signin">
    <form @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="Email address" v-model="username"/>
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password"/>
        <label for="floatingPassword">Password</label>
      </div>

      <LeminCroppedCaptcha ref="captchaRef" v-bind:captcha-id="croppedId" v-bind:container-id="containerId"/>
      <button class="w-100 btn btn-lg btn-primary" onClick={handleSignin}>Sign in</button>
    </form>
  </div>
</template>

<script>
import {LeminCroppedCaptcha} from "@leminnow/vue-lemin-cropped-captcha";
import axios from "axios";

export default {
  name: 'SignInForm',
  components: {
    LeminCroppedCaptcha
  },
  props: {
    msg: String
  },
  data() {
    return {
      username: '',
      password: '',
      croppedId: 'YOUR_CAPTCHA_ID',
      containerId: 'lemin-cropped-captcha'
    }
  },
  methods: {
    onSubmit() {
      const {username, password} = this;
      const {answer, challenge_id} = this.$refs.captchaRef.getCaptchaValue();

      if (answer && challenge_id && username && password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('answer', answer);
        formData.append('challenge_id', challenge_id);

        axios.post('http://localhost:3005/sign-in', formData,
            { headers: {'Content-Type': 'application/json' }}
        ).then(res => {
          if (res.data.success) {
            this.$router.push('/success')
          } else {
            alert(res.data.message)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
}

.form-floating {
  margin-bottom: 15px !important;
}

.btn {
  margin-top: 15px;
}
</style>
