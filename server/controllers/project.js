import Project from '../models/Project.js'
import Role from '../models/Role.js';

export const postProject = async (req, res) => {
    try {
        const { name } = req.body;

        const newProject = new Project({
            name,
        })

        await newProject.save();

        res.json({
            newProject,
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
        const { projectId } = req.body;

        const project = await Project.findById(projectId);

        const roleIds = project.role;

        const roles = await Role.find({ _id: { $in: roleIds }});

        res.json({
            project,
            roles,
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