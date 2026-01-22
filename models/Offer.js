import mongoose from "mongoose";
import { generateSlug } from "../utils/slugifyHelper.js";
import seoSchema from './Seo.js';

const offerSchema = new mongoose.Schema({
    imageCover: {
        type: String,
    },
    offer: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: String,
    },
    oldPrice: {
        type: String,
    },
    slug: { type: String, unique: true },
    alt: { type: String, trim: true },
    seo: { type: seoSchema, default: {} },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
    {
        timestamps: true,
    }
);


offerSchema.pre('save', async function (next) {
    if (!this.slug && this.name) {
        this.slug = await generateSlug(this.name, this.constructor);
    }

    if (!this.alt && this.name) {
        this.alt = `${this.name} - Package`;
    }

    next();
});






export default mongoose.model("Offer", offerSchema);






























// in the production mode, any change requires build new image becuse the hot reload in the dev only
// for deolyment: 1- create server 2- connect to the server 3- install docker on the server 4- from the server, clone the repo 5 build the image and run the container

// but it is not a good choice to build the image in the server so you should

// 1- push the code to the repo 2- connect to docker (docker login) 3- build the image in your machine docker-compose -f docker-compose.yml -f docker-compose.prod.yml build 4- then push the image into your repositry on dockerHub docker-compose -f docker-compose.yml -f docker-compose.prod.yml push (serviceName) 5- from the server, pull the repo from github (git bull) and pull the image from dockerHub (docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull) 6- stop the old containers(if exists)run the container

// If i want load balancer i should make and run multiples inctances (containers) from node-app service and use Nginx as a load balancer to distribute the requests: 1- in the up command: docker-compose -f docker-compose.yml -f docker-compose.prod.yml -d up --scale node-app=3 but you shouldnt give the service container_name field because it will lead to duplication errors

// 2- in case of load balancing we dont need to expose the ports of my app 4000:4000 beacuse the request comes firsr to nginx on 80:80 and it forwards the request to the app container on port 4000 automatically so, now port 4000 already in use so it cant make another instance on the same port because it will lead to errors

// 3- networking: the communication is automatically between any container with another one in the same server or anothe server in case of scaling and by default there is a load balancer to distribute the requests

// 4- error handling: if a container is failed, the docker orchestration automatically resyart the conatiner and if there is a scale it creates another one to ensure the scale is done

// 5- updating in case we have an update and we want to send this update to the server , rather than we stop the containers and pull the image and run the containers not efficient because any requests in this time the serer will be failed, with docker orchestration it automatically create another container to serve the requests and stop the old one and pull the image and run the new container

// __ Docker swarm: Docker orckestration layer nodes: basic unit of Docker swarm which we use to run the containers inside it manager nodes: the brain of Docker swarm which make the decisions of the options we talked about above worker nodes: contain the containers

// we go to define stack (it like a docker compose file) we define the services we want to make it run in a worker node

// on the server terminal: docker swarm init : to initialize swarm with one mnager node