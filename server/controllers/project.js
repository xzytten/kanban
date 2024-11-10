import Project from '../models/Project.js'
import User from '../models/User.js'
import Member from '../models/Member.js'
import crypto from 'crypto';
import { encrypt, decrypt } from '../utils/inviteUrl.js';

//postProject
export const addProject = async (req, res) => {
    try {
        const { name, author } = req.body;

        const newProject = new Project({
            name,
            author,
        })

        const inviteToken = crypto.randomBytes(16).toString('hex'); // Генеруємо 32-символьний токен
        newProject.inviteUrl = inviteToken;

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

        // const encryptedToken = encrypt(inviteToken);

        // console.log('i',inviteToken)
        // console.log(encryptedToken);

        res.json({
            project: {
                _id: newProject.id,
                name: newProject.name,
                member: newProject.member,
                task: newProject.task,
                author: newProject?.author,
                role: newProject.role,
                inviteUrl: inviteToken
            },
            message: "Subtask added"
        })

    } catch (error) {
        res.json({
            meassage: 'error'
        })
    }
}

//addProjectInvite
export const addProjectInvite = async (req, res) => {
    try {
        const { token, user } = req.body;

        // const decryptToken = decrypt(token)

        const project = await Project.findOne({ inviteUrl: token });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const findedUser = await User.findById(user._id)

        project.member.push(findedUser._id)
        findedUser.project.push(project._id);

        await findedUser.save();

        res.json({
            project: {
                _id: project.id,
                name: project.name,
                inviteUrl: token
            },
            message: "Project added successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

//projectInvite
export const getProjectInvite = async (req, res) => {
    try {

        const { token, userId } = req.params;

        // const decryptToken = decrypt(token)

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'You are not auth', reqStatus: 'notAuth' });
        }

        const project = await Project.findOne({ inviteUrl: token });
        if (!project) {
            return res.status(404).json({ message: 'Project not found', reqStatus: "ProjectNotFound" });
        }

        const projectExistsInUser = user.project.includes(project._id);

        if (projectExistsInUser) {
            return res.status(200).json({ message: 'You already have this project :)', reqStatus: "alreadyExist" });
        } else {
            res.json({
                project: {
                    _id: project.id,
                    name: project.name,
                    member: project.member,
                    task: project.task,
                    author: project?.author,
                    role: project.role,
                    inviteUrl: project.inviteUrl
                },
                message: 'Project found successfully',
                reqStatus: 'showProject'
            });
        }


    } catch (error) {
        res.status(500).json({
            message: 'Error occurred while fetching project and roles'
        });
    }
};

//getProject
export const getProjects = async (req, res) => {
    try {
        const { userId } = req.params

        const findedUser = await User.findById(userId)

        const projectIds = findedUser.project

        const projects = await Project.find({ _id: { $in: projectIds } }).select('_id name inviteUrl');

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