class SawTooth {
  constructor(){
    this.x = 0;
  }
  next(){
    this.x += 880 / sampleRate;
    if(this.x > 1){
      this.x -= 2;
    }
    return this.x;
  }
}

class SawToothGenerator extends AudioWorkletProcessor {
  constructor(){
    super();
    this.inner = new SawTooth;
  }
  static get parameterDescriptors(){
    return [{
        name: 'velocity',
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate"
    }];
  }
  process(_inputs, outputs, parameters){
    for(let channel of outputs[0]){
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.inner.next() * parameters.velocity[0];
      }
    }
    return true
  }
}

registerProcessor('sawtooth-generator', SawToothGenerator)