import { createConnections } from 'typeorm';

createConnections().then(() => console.log('<-----> Lunch Postgres <----->'));
