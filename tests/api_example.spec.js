import { expect, test } from "@playwright/test";
import postsList from "../test-data/posts.json"
import { request } from "node:http";

test.describe("Tests API avec JSONPlaceholder", () => {
    
    test("GET - Liste des posts", async({request}) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts');
        
        expect(response.status()).toBe(200);
        const posts = await response.json();
        
        console.log('Nombre de posts:', posts);
        expect(posts).toBeInstanceOf(Array);
        expect(posts.length).toBe(100);
        expect(posts[0]).toHaveProperty('title');
    });

    test("GET - Un post spécifique", async({request}) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        
        expect(response.status()).toBe(200);
        const post = await response.json();
        console.log('Post:', post);
        expect(post.id).toBe(1);
        expect(post.userId).toBe(1);
        expect(post.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
        // expect(post.title).toBeDefined();
      
    });
    test("tester equation entre deux lists ", async({request})=>{
        const posts= await request.get('https://jsonplaceholder.typicode.com/posts');
        const postsResponse= await posts.json();

        expect(postsResponse).toEqual(postsList);
        console.log("qaulity is done !!!!");
     })

    test("Testing Store a new post",async({request})=>{
    const newPost={
        "userId": 1,
        "id": 101,
        "title": "Test",
        "body": "iam testing right now!!!!!"
    }
    const req= await request.post('https://jsonplaceholder.typicode.com/posts',{
        data:newPost

    })
    const response =  await request.get('https://jsonplaceholder.typicode.com/posts');
    const responseBody=await req.json();
    console.log(responseBody);
    expect(req.status()).toBe(201);
    expect(responseBody.id).toBe(newPost.id);
    expect(responseBody.title).toBe(newPost.title);
    // const newResp= await response.json();
    // console.log(newResp);
})
//testing update a post 

test("testing Update a Post ", async({request})=>{
    const updatedPost={
        "userId": 5,
        "title": "updated Title",
        "body": "Update: cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut"
    }
    const response2 = await request.put('https://jsonplaceholder.typicode.com/posts/100',{
        data:updatedPost
    });
    const responseBody= await response2.json();
    console.log(responseBody);


})
//testinnng deleting a post 
test("Test Delete a post",async({request})=>{
    const response= await request.delete('https://jsonplaceholder.typicode.com/posts/100');
    expect(response.status()).toBe(200);
    // const responseBody= await response.json();
    // console.log(responseBody);
})

  });