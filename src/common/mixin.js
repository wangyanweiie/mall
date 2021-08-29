//对backTop功能的混入抽取（我没有应用）
/********************************************************
在生命周期各个模块中的内容可以与引入组件的生命周期内容进行合并;
但在methods中的各个函数之间会直接替换
**********************************************************/
import BackTop from 'components/content/backtop/BackTop'
export const backTopMixIn = {
  components:{
    BackTop,
  },
  data(){
    return{
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      //通过在子组件标签绑定:ref,访问子组件的方法
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}
