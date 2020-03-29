<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>
        <q-separator dark vertical inset />
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-separator dark vertical inset />
        <q-btn stretch flat align="right" icon="home" label="Home" to="/" />

        <q-space />

        <q-btn-dropdown stretch flat label="Forms">
          <q-list>
            <q-item-label header>Forms</q-item-label>
            <q-item clickable v-close-popup tabindex="0" to="/simpleAPIForm">
              <q-item-section>
                <q-item-label>Simple API Form</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="1" to="/multiPageForm">
              <q-item-section>
                <q-item-label>Multi page form</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown stretch flat label="Games">
          <q-list>
            <q-item-label header>Games</q-item-label>
            <q-item clickable v-close-popup tabindex="0" to="/2048">
              <q-item-section>
                <q-item-label>2048</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="1" to="/minesweeper">
              <q-item-section>
                <q-item-label>minesweeper</q-item-label>
                <q-item-label caption>February 22, 2016</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-separator dark vertical />
        <q-btn stretch flat icon="code" @click="sourceCode" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-leftDrawerOpen bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Essential Links</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Github",
          caption: "github.com/quasarframework",
          icon: "code",
          link: "https://github.com/quasarframework"
        },
        {
          title: "Discord Chat Channel",
          caption: "chat.quasar.dev",
          icon: "chat",
          link: "https://chat.quasar.dev"
        },
        {
          title: "Forum",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev"
        },
        {
          title: "Twitter",
          caption: "@quasarframework",
          icon: "rss_feed",
          link: "https://twitter.quasar.dev"
        },
        {
          title: "Facebook",
          caption: "@QuasarFramework",
          icon: "public",
          link: "https://facebook.quasar.dev"
        }
      ]
    };
  },
  methods: {
    sourceCode() {
      location.href =
        "https://github.com/Pietervanhalem/Personal-Quasar-website";
    }
  }
};
</script>
