<template lang="html">
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="alias">Display Name:</label>
        <input type="text" name="alias" v-model="alias">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="center">
        <button type="submit" class="btn">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
import firebase from 'firebase'
import database from '@/firebase/init'
import 'firebase/auth' // production/dev differences

import slugify from 'slugify'


export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      alias: null,
      password: null,
      slug: null,
      feedback: null
    }
  },
  methods: {
    signup() {
      //check if alias exists
      if(this.alias && this.email && this.password){
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,  // remove globally
          lower: true
        })
        let ref = database.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists){
            this.feedback = 'Display name taken'
          }
          else{
            // console.log("does not exist")
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(crd => {
              ref.set({
                alias: this.alias,
                user_id: crd.user.uid
              })
              .then(() => {
                this.$router.push({name: 'Index'})
              })
            })
            .catch(err => {
              this.feedback = err.message
            })
          }
        })



      }
    }
  }
}
</script>


<style lang="css">

.signup {
  max-width: 450px;
  margin-top: 50px;
}

.signup .btn{
  margin-top: 20px;
}
</style>
