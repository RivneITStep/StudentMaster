﻿using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<myClassResult>> getAllClasses();
        Task<bool> inviteUser(string email);
        Task<bool> inviteUser(string email, int classId);


        Task<bool> removeStudentFromClass(string studentID);


        Task<bool> editSubjectsInClass(int classId, int subjectId);
        Task<bool> editRoleOfUser(string uid, string role);
        Task<IEnumerable<subjectResult>> getAllSubjects();
        Task<IEnumerable<string>> getAllRoles();
        Task<IEnumerable<string>> getUserRoles(string uid);
        Task<IEnumerable<subjectResult>> getClassSubjects(int classId);

        Task<IEnumerable<subjectResult>> getTeacherSubjects(string uid);
        Task<bool> editSubjectsInTeacher(int subjectId, string teacherId);
        Task<bool> editTeachersInClass(int classId, string teacherId);
        Task<IEnumerable<teacherResult>> getAllTeachers();
        Task<IEnumerable<teacherResult>> getClassTeachers(int classId);
        Task<PaginationResult<studentResult>> getUsers(int page, int count = 10);

        Task<IEnumerable<StudentClassResult>> getStudentClassAndAllClasses(string uid);
        Task<bool> editStudentClass(int classId, string studentId);
        void createSubject(string subjectName);
        void removeSubject(string subjectName);
        void rollbackSubject(string subjectName);
        void changeNameSubject(string oldName, string newName);

        void addNew(addNewViewModel model);
        void removeNew(int id);
    }
}
