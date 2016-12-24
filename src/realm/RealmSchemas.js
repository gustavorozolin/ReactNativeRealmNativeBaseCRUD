import Realm from 'realm'

const TaskSchema = {
  	name: 'Task',
  	primaryKey: 'id',
  	properties: {
		id: 'int',
    description:  'string'
		}
};


// Initialize a Realm with models
let realmSchema = new Realm({schema: [TaskSchema]});
export default realmSchema;
