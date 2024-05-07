import Project from '../models/Project.js'
import User from '../models/User.js'
import Member from '../models/Member.js'

import Role from '../models/Role.js';

export const postProject = async (req, res) => {
    try {
        const { name, author } = req.body;
        
        const newProject = new Project({
            name,
            author,
        })

        //add member
        const newMember = new Member({
            projectId: newProject.id,
            userId: author,
            position: "author"
        })
        await newMember.save();

        //add PROJECT to user
        const user = await User.findById(author);
        user.project.push(newProject._id);
        await user.save();
        
        //add PROJECT
        newProject.member.push(newMember._id); 
        await newProject.save();
        
 
        res.json({
            project:newProject,
            message: "Subtask added"
        })
      
    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}

export const getProject = async (req, res) => {
    try {
        const { projectIds } = req.body;

        const projects = await Project.find({ _id: { $in: projectIds } });
 

        res.json({
            projects,
            message: "Project and roles found"
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error occurred while fetching project and roles'
        });
    }
};

// export const getAllRole = async () => {
//     try {
        
//     } catch (error) {

//     }
// }