import { expect, test } from "@playwright/test";

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
  });