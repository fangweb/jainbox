// Test grpc feature between api and subscriber
import * as request from "superagent";
import * as ws from 'ws';

test("integration between api, subscriber, and nginx", async () => {
  try {
    const tokenStr = '';
    
    const responseA = await request
                    .post("http://localhost:3001/messages/composez")
                    .send({ username: "integServiceUserA", password: "password1" });

    const responseB = await request
                    .post("http://localhost:3001/messages/compose")
                    .send({ username: "integServiceUserB", password: "password2" });
    
    console.log(responseA);
    
    /*
    await request
            .post("http://localhost:3001/messages/compose")
            .set("Authorization", userA.get("Authorization"))
            .send({ receiver_name: "integTestUserA", "My Message" });

    await request
            .post("http://localhost:3001/messages/compose")
            .set("Authorization", userB.get("Authorization"))
            .send({ receiver_name: "integTestUserA", "My Message" });
    */
    
  } catch (error) {
    throw error;
  }   
});

