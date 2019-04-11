<template>
  <div class="change-theme-wrapper">
    前端换肤
    <button class="btn" @click="changeTheme">changeTheme</button>
  </div>
</template>
<script>
import Color from 'css-color-function'
import formula from '@/config/formula'
export default {
  name: "ChangeTheme",
  data () {
    return {
      initColorCluster: ['#ff571a', ...this.generateColors('#ff571a')],
      themeColor: 'red'
    }
  },
  computed: {
    initStyleReg: function () {
      return this.initColorCluster.join("|").replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/0\./g, '.')
    }
  },
  methods: {
    changeTheme () {
      this.changeColor('#dddddd')
    },
    generateColors: primary => {
      return formula.map(f => {
        const value = f.exp.replace(/primary/g, primary)
        return Color.convert(value)
      })
    },
    changeColor: function(color) {
      if (color !== this.themeColor) {
        const styles = document.querySelectorAll('.so-ui-theme').length > 0 
        ? Array.from(document.querySelectorAll('.so-ui-theme'))
        : Array.from(document.querySelectorAll('style')).filter(style => {
          const text = style.innerText;
          const re = new RegExp(`${this.initStyleReg}`, 'i')
          return re.test(text);
        })
        const oldColorCluster = this.initColorCluster.slice();
        const re = new RegExp(`${this.initStyleReg}`, 'ig'); 

        styles.forEach(style => {
            const { innerText } = style;
            style.innerHTML = innerText.replace(re, match => {
                let index = oldColorCluster.indexOf(match.toLowerCase().replace('.', '0.'));

                if (index === -1) index = oldColorCluster.indexOf(match.toUpperCase().replace('.', '0.'));
                // 进行替换
                return this.initColorCluster[index].toLowerCase().replace(/0\./g, '.');
            });
            style.setAttribute('class', 'so-ui-theme');
        });

        this.themeColor = color

      }
    }
  },
  mounted () {
  
  }
}
</script>
<style>
.change-theme-wrapper{
  color:black;
}

</style>

