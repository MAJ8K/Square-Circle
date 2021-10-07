import websockets
import asyncio

PORT = 7890

print('Started Server')
print('listening on port: ' + str(PORT))

conns = set()
playerdata = []

async def echo(websocket, path):
    print("A Client just connected")
    conns.add(websocket)
    mydata = ('pcolor','scolor',0.0,0.0, 0.0,0.0,0.0,0.0,0.0,0.0)
    playerdata.append(mydata)
    try:
        async for message in websocket:
            marker = 0
            for conn in conns:
                if (conn == websocket): 
                    playerdata[marker] = mydata
                    break
                marker += 1
            for conn in conns:
                if(conn == websocket):
                    await conn.send(playerdata)
    except websockets.exceptions.ConnectionClosed as e:
        print("client disconnected: ")
        print(e)
    finally:
        conns.remove(websocket)
        playerdata.pop()

start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()