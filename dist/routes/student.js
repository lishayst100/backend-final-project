import { Router } from "express";
import { Student } from "../db/schemas/student.js";
const router = Router();
router.get('/students', (req, res) => {
    Student.find()
        .then(result => res.json(result))
        .catch(e => res.json({ message: e }));
});
router.post('/addStudent', (req, res) => {
    const studentCard = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    });
    studentCard
        .save()
        .then((result) => res.json({ message: 'student added' }))
        .catch(e => res.json({ message: `${e}` }));
});
export { router as studentRouter };
