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
        <label for="add-attributes">Add Playlist Attributes:</label>
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
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AppPlaylist',
  data() {
    return {
      title: null,
      attrb: null,
      attributes: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addPlaylist(){
      if(this.title){
        this.feedback = null
        // create slug from slugify
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*+~.()'"!\-:@]/g,
          lower: true //lowercase
        })
        console.log(this.slug)
        console.log(this.attributes)
        console.log(this.title)

        database.collection('playlists').add({
          title: this.title,
          attributes: this.attributes,
          slug: this.slug
        })
        .then(() => {
          //redirect
          this.$router.push({name: 'Index'})
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.feedback = "Enter A Playlist Title"
      }
    },
    addAttrb(){
      if(this.attrb){
        this.attributes.push(this.attrb)
        this.attrb = null
        this.feedback = null
      } else {
        this.feedback = 'Enter a value'
      }
    },
    deleteAttrb(attrb){
      this.attributes = this.attributes.filter(attribute => {
        return attribute != attrb
      })
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
</style>
