import websockets
import asyncio

PORT = 7890

print('Started Server')
print('listening on port: ' + str(PORT))

conns = set()

async def echo(websocket, path):
    print("A Client just connected")
    conns.add(websocket)
    try:
        async for message in websocket:
            print("Ping: " + message)
            for conn in conns:
                if(conn == websocket):
                    await conn.send("Someone said: " + message)
    except websockets.exceptions.ConnectionClosed as e:
        print("client disconnected: ")
        print(e)
    finally:
        conns.remove(websocket)

start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()