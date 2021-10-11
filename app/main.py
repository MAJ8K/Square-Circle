import asyncio
import websockets
import json

PORT = 7890

conns = set()
playerdata = {}

async def echo(websocket, path):
    print("A Client just connected")
    conns.add(websocket)
    try:
        async for message in websocket:
            mydata = (
                message.split(',')[0],#colors
                message.split(',')[1],
                float(message.split(',')[2]),#p
                float(message.split(',')[3]),
                float(message.split(',')[4]),#b1
                float(message.split(',')[5]),
                float(message.split(',')[6]),#b2
                float(message.split(',')[7]),
                float(message.split(',')[8]),#b3
                float(message.split(',')[9]),
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

async def main():
    async with websockets.serve(echo, "0.0.0.0", 7890):
        await asyncio.Future()  # run forever

asyncio.run(main())