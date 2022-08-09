const audioContext = new AudioContext()

await audioContext.audioWorklet.addModule('sawtooth-generator.js');
const sawtoothGenerator = new AudioWorkletNode(audioContext, 'sawtooth-generator');
sawtoothGenerator.connect(audioContext.destination);

resume.onclick = () => audioContext.resume()
suspend.onclick = () => audioContext.suspend()
change_velocity.oninput = event => sawtoothGenerator.parameters.get('velocity').value = event.target.value / 100;
