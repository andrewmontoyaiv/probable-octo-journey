<template lang="html">
  <div class="add-playlist container">
    <h2 class="center-align indigo-text">Add A New Playlist</h2>
    <form @submit.prevent="addPlaylist">

      <div class="field title">
        <label for="title">Playlist Title:</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div class="field" v-for="(attribute, index) in attributes" :key="index" >
        <label for="attribute">Attribute:</label>
        <input type="text" name="attribute" v-model="attributes[index]">
        <i class="material-icons delete" @click="deleteAttrb(attribute)">delete</i>
      </div>

      <!-- event modifier keydown event -->
      <div class="field add-attributes">
        <label for="add-attributes">Add Playlist Attributes: (+ OR tab to save)</label>
        <i class="material-icons add" @click="addAttrb">add</i>
        <!-- set action and prevent default behavior (losing focus) -->
        <input type="text" name="add-attributes" @keydown.tab.prevent="addAttrb" v-model="attrb">
      </div>

      <div class="field center-align">
        <p class="red-text" >{{ feedback }}</p>
        <button class="btn pink">Add Playlist</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AppPlaylist',
  data() {
    return {
      title: null,
      user: null,
      attributes: [],
      slug: null,
      attrb: null,
      feedback: null
    }
  },
  methods: {
    addPlaylist(){
      if(this.title){
        let flag = true;
        this.attributes.forEach(attribute => {
          console.log(attribute)
          if(attribute == null || attribute == ''){
            // TODO: signal event to change text style

            flag = false;
          }
        })

        if(flag && this.attributes.length){
          this.feedback = null
          // create slug from slugify

          // console.log(this.slug)
          // console.log(this.attributes)
          // console.log(this.title)

          // query for user alias
          let user = firebase.auth().currentUser

          //find user record & Update
          if(user){
            database.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot => {

              // callback func
              snapshot.forEach((doc) => {
                database.collection('users').doc(doc.id).get()
                .then(doc => {
                  this.user = doc.data().alias;

                  this.slug = slugify(doc.id + '/' + this.title, {
                    replacement: '-',
                    remove: /[$*+~.()'"!\-:@]/g,
                    lower: true //lowercase
                  })

                  database.collection('playlists').add({
                    title: this.title,
                    user: this.user,
                    attributes: this.attributes,
                    slug: this.slug
                  })
                  .then(() => {
                    //redirect
                    this.$router.push({name: 'Index'})
                  }).catch(err => {
                    console.log(err)
                  })

                })
              })
            })
          } else {
            this.slug = slugify(this.title, {
              replacement: '-',
              remove: /[$*+~.()'"!\-:@]/g,
              lower: true //lowercase
            })

            database.collection('playlists').add({
              title: this.title,
              user: this.user,
              attributes: this.attributes,
              slug: this.slug
            })
            .then(() => {
              //redirect
              this.$router.push({name: 'Index'})
            }).catch(err => {
              console.log(err)
            })
          }
          this.feedback = null
        }
        else{
          this.feedback = "Attribute(s) Is Empty"
        }
      }else {
        if(!this.title){
          this.feedback = "Playlist Title Is Empty"
        }else if (!this.user) {
          this.feedback = "Created By Is Empty"
        }
      }
    },

    addAttrb(){
      this.attributes.push(this.attrb)
      this.attrb = null
    },

    deleteAttrb(attrb){
      this.attributes = this.attributes.filter(attribute => {
        return attribute != attrb
      })
    },

    created(){

    }
  }
}
</script>

<style lang="css">

  .add-playlist{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .add-playlist h2{
    font-size: 2em;
    margin: 20px auto;
  }

  .add-playlist .field{
    margin: 20px auto;
    position: relative;
  }

  .add-playlist .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }

  .add-playlist .error{
    color: red;
  }

  .add-playlist .add-attributes{
    margin: 0, auto;
  }

  .add-playlist .add-attributes .add{
    position: absolute;
    color: #aaa;
    right: 0px;
    top: 35px;
    font-size: 1.4em;
    cursor: pointer;

  }


</style>
