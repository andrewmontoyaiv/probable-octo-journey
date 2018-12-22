<template lang="html">
  <div v-if="playlist" class="edit-playlist container">
    <h2>Edit {{ playlist.title }} Playlist</h2>
    <form @submit.prevent="editPlaylist">

      <div class="field title">
        <label for="title">Playlist Title:</label>
        <input type="text" name="title" v-model="playlist.title">
      </div>

      <div class="field" v-for="(attribute, index) in playlist.attributes" :key="index" >
        <label for="attribute">Attribute:</label>
        <input type="text" name="attribute" v-model="playlist.attributes[index]">
        <i class="material-icons delete" @click="deleteAttrb(attribute)">delete</i>
      </div>

      <!-- event modifier keydown event -->
      <div class="field add-attributes">
        <i class="material-icons add" @click="addAttrb">add</i>
        <label for="add-attributes">Add Playlist Attributes:</label>
        <!-- set action and prevent default behavior (losing focus) -->
        <input type="text" name="add-attributes" @keydown.tab.prevent="addAttrb" v-model="attrb">
      </div>

      <div class="field center-align">
        <p class="red-text" >{{ feedback }}</p>
        <button class="btn pink">Update Playlist</button>
      </div>
    </form>
  </div>
</template>

<script>
import database from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditPlaylist',
  data() {
    return{
      playlist: null,
      attrb: null,
      feedback: null

    }
  },
  methods: {
    addAttrb(){
      this.playlist.attributes.push(this.attrb)
      this.attrb = null
      this.feedback = null
    },
    editPlaylist(){
      if(this.playlist.title){
        // TODO: check if playlist already exists for the user

        let flag = true;
        this.playlist.attributes.forEach(attribute => {
          console.log(attribute)
          if(attribute == null || attribute == ''){
            // TODO: signal event to change text style

            flag = false;
          }
        })

        if(flag){
          this.feedback = null
          // create slug from slugify
          this.playlist.slug = slugify(this.playlist.user + '/' + this.playlist.title, {
            replacement: '-',
            remove: /[$*+~.()'"!\-:@]/g,
            lower: true //lowercase
          })

          database.collection('playlists').doc(this.playlist.id).update({
            title: this.playlist.title,
            attributes: this.playlist.attributes,
            slug: this.playlist.slug
          })
          .then(() => {
            //redirect
            this.$router.push({name: 'Index'})
          }).catch(err => {
            console.log(err)
          })
        } else{
          this.feedback = "Attribute(s) Is Empty"
        }
      }else {
        this.feedback = "Playlist Title is Empty"
      }
    },
    deleteAttrb(attrb){
      this.playlist.attributes = this.playlist.attributes.filter(attribute => {
        return attribute != attrb
      })
    }
  },
  created(){
    let ref = database.collection('playlists').where('slug', '==', this.$route.params.playlist_slug)
    //get() is how we get the data
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.playlist = doc.data()
        this.playlist.id = doc.id
      })
    })
  }
}
</script>

<style lang="css">
.edit-playlist{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-playlist h2{
  font-size: 2em;
  margin: 20px auto;
}

.edit-playlist .field{
  margin: 20px auto;
  position: relative;
}

.edit-playlist .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

.edit-playlist .add-attributes .add{
  position: absolute;
  color: #aaa;
  right: 0px;
  top: 35px;
  font-size: 1.4em;
  cursor: pointer;

}
</style>
