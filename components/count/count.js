Component({
  data: { counter: 0 },
  props: {
    onCounterPlusOne: (data) => {
      console.log(data);
    },
    extra: 'default extra',
  },
  methods: {
    plusOne(e) {
      console.log(e);
      const counter2 = this.data.counter + 1;
      this.setData({ counter:counter2 });
      this.props.extra = this.props.extra+"---"+ counter2
      this.props.onCounterPlusOne(counter2,this.props.extra);
    },
  },         
});