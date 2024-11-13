const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
console.log("signup");

    const usersRef = db.collection('users');
    const existingUser = await usersRef.where('email', '==', email).get();
    
    if (!existingUser.empty) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserRef = usersRef.doc();
    await newUserRef.set({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUserRef.id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token,role});
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersRef = db.collection('users');
    const userRef = await usersRef.where('email', '==', email).get();

    console.log("eero1");
    
    if (userRef.empty) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = userRef.docs[0].data();
    const userId = userRef.docs[0].id;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, role:user.role });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
