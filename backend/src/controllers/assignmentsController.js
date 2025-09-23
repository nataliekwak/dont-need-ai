export const getAllAssignments = (req, res) => {
    res.status(200).send("you have assignments");
}

export const createAssignment = (req, res) => {
    res.status(201).send("assignment created");
}