from api.server import Server

# Create a new server instance and expose the app
server = Server()
app = server.app

if __name__ == '__main__':
    server.run()
