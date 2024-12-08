"use client";

import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    Chip
} from '@mui/material';
import { deleteLessonsFromFirestore } from "@/app/services/LessonsServices";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { query, collection, where, getDocs, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function TableLessons({ type }) {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(type === "user" ? "user_id" : "driver_id");

    // Fetch userId from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("IdUser");
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                setError("User ID not found in localStorage.");
            }
        }
    }, []);

    useEffect(() => {
        const getLessons = async () => {
            if (!userId) return;
            try {
                setLoading(true);

                const lessonsQuery = query(
                    collection(db, "lessons"),
                    where(userType, "==", userId)
                );

                const querySnapshot = await getDocs(lessonsQuery);

                const filteredLessons = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setLessons(filteredLessons);
            } catch (err) {
                setError("Failed to fetch lessons.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getLessons();
    }, [userId, userType]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading) return <Loader />;

    function addTimes(time1, time2) {
        // Convert both times to hours and minutes
        const [hours1, minutes1] = time1.split(':').map(Number);
        const [hours2, minutes2] = time2.split(':').map(Number);
    
        // Calculate total hours and minutes
        let totalMinutes = minutes1 + minutes2;
        let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);
    
        // Adjust minutes and handle overflow
        totalMinutes = totalMinutes % 60;
        totalHours = totalHours % 24; // Wrap around if total hours >= 24
    
        // Format result as HH:mm
        const formattedHours = String(totalHours).padStart(2, '0');
        const formattedMinutes = String(totalMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }

    const handleDelete = async (event, selectedLesson) => {
        if (event) event.preventDefault();
        try {
            const userDocRef = doc(db, "users", userId);
            const docSnap = await getDoc(userDocRef);
            await setDoc(userDocRef, {
                driving_hours: addTimes(docSnap.data().driving_hours, selectedLesson.time)
            }, { merge: true });
            await deleteLessonsFromFirestore(selectedLesson.id);
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== selectedLesson.id));
        } catch (err) {
            console.error("Failed to delete lesson:", err);
            toast.error("Failed to delete lesson. Please try again.");
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "Invalid Date";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleString('en-US', options);
    };

    const handleApproval = async (docId, status) => {
        if (!["Accepted", "Rejected"].includes(status)) {
            toast.error("Invalid status update.");
            return;
        }
        try {
            const docRef = doc(db, "lessons", docId);
            await updateDoc(docRef, { status });
            setLessons((prev) =>
                prev.map((lesson) =>
                    lesson.id === docId ? { ...lesson, status } : lesson
                )
            );
            toast.success(`${status} successfully!`);
        } catch (error) {
            console.error("Error updating document status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const filteredLessons = lessons.filter((lesson) =>
        lesson.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.time?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                mt: 3,
                overflowX: 'auto',
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '100%' },
                mx: 'auto'
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="lessons table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>User ID</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredLessons.map((lesson) => (
                        <TableRow key={lesson.id}>
                            <TableCell>{lesson.id}</TableCell>
                            <TableCell>{formatTimestamp(lesson.date)}</TableCell>
                            <TableCell>{lesson.time || "N/A"}</TableCell>
                            <TableCell>
                                <Chip
                                    label={lesson.status}
                                    color={
                                        lesson.status === "Accepted"
                                            ? "success"
                                            : lesson.status === "Rejected"
                                                ? "error"
                                                : lesson.status === "pending"
                                                    ? "warning"
                                                    : "default"
                                    }
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton color="primary">
                                    <Link href={`/${type}/lessons/edit/${lesson.id}`}><FaEdit /></Link>
                                </IconButton>
                                <IconButton color="secondary">
                                    <Link href={`/${type}/lessons/view/${lesson.id}`}><LuView /></Link>
                                </IconButton>
                                <IconButton
                                    onClick={(e) => handleDelete(e, lesson)}
                                    color="error"
                                >
                                    <FaTrash />
                                </IconButton>
                                {type === "driver" && (
                                    <>
                                        {lesson.status === "pending" ? (
                                            <>
                                                <IconButton
                                                    onClick={() => handleApproval(lesson.id, "Accepted")}
                                                    color="success"
                                                >
                                                    <FaCheckCircle />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleApproval(lesson.id, "Rejected")}
                                                    color="error"
                                                >
                                                    <IoCloseCircle />
                                                </IconButton>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
