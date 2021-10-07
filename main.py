import websockets
import asyncio
import json

PORT = 7890

print('Started Server')
print('listening on port: ' + str(PORT))

conns = set()
playerdata = {}

async def echo(websocket, path):
    print("A Client just connected")
    conns.add(websocket)
    # mydata = ('pcolor','scolor',px,px,bullets)
    try:
        async for message in websocket:
            mydata = (
                message.split(',')[0],
                message.split(',')[1],
                float(message.split(',')[2]),
                float(message.split(',')[3]),
            )
            playerdata[str(websocket)] = mydata
            temp = []
            for X in playerdata:
                if (X != str(websocket)):
                    temp.append(playerdata[X])
            await websocket.send(json.dumps(temp))

    except websockets.exceptions.ConnectionClosed as e:
        print("client disconnected: ")
        print(e)
    finally:
        playerdata.pop(str(websocket))
        conns.remove(websocket)

start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()