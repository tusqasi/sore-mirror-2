import { Socket } from "phoenix"

let socket = new Socket("/socket", {})

socket.connect()

function join(channel) {
	channel.join()
		.receive("ok", resp => { console.log("Joined successfully", resp) })
		.receive("error", resp => { console.log("Unable to join", resp) })
}

var game_channel = socket.channel("sore_comms:lobby", {})
join(game_channel);
game_channel.push('shout', { sdf: "sdf" })
game_channel.on('shout', (p) => { console.log(p) })

export default socket
