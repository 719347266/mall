<template>
  <div class="wrapper">
  <ul >
    <li>消息1</li>
    <li>消息2</li>
    <li>消息3</li>
    <li>消息4</li>
    <li>消息5</li>
    <li>消息6</li>
    <li>消息7</li>
    <li>消息8</li>
    <li>消息9</li>
    <li>消息10</li>
    <li>消息11</li>
    <li>消息12</li>
    <li>消息13</li>
    <li>消息14</li>
    <li>消息15</li>
    <li>消息16</li>
    <li>消息17</li>
    <li>消息18</li>
    <li>消息19</li>
    <li>消息20</li>
    <li>消息21</li>
    <li>消息22</li>
    <li>消息23</li>
    <li>消息24</li>
    <li>消息25</li>
    <li>消息26</li>
    <li>消息27</li>
    <li>消息28</li>
    <li>消息29</li>
    <li>消息30</li>
    <li>消息31</li>
    <li>消息32</li>
    <li>消息33</li>
    <li>消息34</li>
    <li>消息35</li>
    <li>消息36</li>
    <li>消息37</li>
    <li>消息38</li>
    <li>消息39</li>
    <li>消息40</li>
    <li>消息41</li>
    <li>消息42</li>
    <li>消息43</li>
    <li>消息44</li>
    <li>消息45</li>
    <li>消息46</li>
    <li>消息47</li>
    <li>消息48</li>
    <li>消息49</li>
    <li>消息50</li>
    <li>消息51</li>
    <li>消息52</li>
    <li>消息53</li>
    <li>消息54</li>
    <li>消息55</li>
    <li>消息56</li>
    <li>消息57</li>
    <li>消息58</li>
    <li>消息59</li>
    <li>消息60</li>
    <li>消息61</li>
    <li>消息62</li>
    <li>消息63</li>
    <li>消息64</li>
    <li>消息65</li>
    <li>消息66</li>
    <li>消息67</li>
    <li>消息68</li>
    <li>消息69</li>
    <li>消息70</li>
    <li>消息71</li>
    <li>消息72</li>
    <li>消息73</li>
    <li>消息74</li>
    <li>消息75</li>
    <li>消息76</li>
    <li>消息77</li>
    <li>消息78</li>
    <li>消息79</li>
    <li>消息80</li>
    <li>消息81</li>
    <li>消息82</li>
    <li>消息83</li>
    <li>消息84</li>
    <li>消息85</li>
    <li>消息86</li>
    <li>消息87</li>
    <li>消息88</li>
    <li>消息89</li>
    <li>消息90</li>
    <li>消息91</li>
    <li>消息92</li>
    <li>消息93</li>
    <li>消息94</li>
    <li>消息95</li>
    <li>消息96</li>
    <li>消息97</li>
    <li>消息98</li>
    <li>消息99</li>
    <li>消息100</li>
  </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:2,
        // pullUpLoad:true
      })
      this.scroll.on('scroll',(position)=>{
        console.log(position);
      })
      // this.scroll.on('pullingUp',()=>{
      //   console.log('上拉更新')
      //   setTimeout(()=>{
      //     scroll.finishPullUp()
      //   },2000)
      // })
    }
  }
</script>

<style scoped>
 .wrapper{
   height: 150px;
   background: pink;
   overflow: hidden;
   /*overflow-y: scroll;*/
 }
</style>
