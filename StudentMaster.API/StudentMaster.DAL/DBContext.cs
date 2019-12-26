using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentMaster.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.DAL
{
    public class DBContext : IdentityDbContext<User>
    {
        public DBContext(DbContextOptions options)
       : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserClasses>()
                .HasKey(t => new { t.UserId, t.ClassId });

            modelBuilder.Entity<UserClasses>()
                .HasOne(sc => sc.User)
                .WithMany(s => s.UserClasses)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<UserClasses>()
                .HasOne(sc => sc.Class)
                .WithMany(c => c.UserClasses)
                .HasForeignKey(sc => sc.ClassId);

            // Subjects to Teachers
            modelBuilder.Entity<TeacherSubject>()
    .HasKey(t => new { t.UserId, t.SubjectId });

            modelBuilder.Entity<TeacherSubject>()
                .HasOne(sc => sc.User)
                .WithMany(s => s.teacherSubjects)
                .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<TeacherSubject>()
                .HasOne(sc => sc.Subject)
                .WithMany(c => c.teacherSubjects)
                .HasForeignKey(sc => sc.SubjectId);


            modelBuilder.Entity<ClassSubject>()
.HasKey(t => new { t.ClassId, t.SubjectId });

            modelBuilder.Entity<ClassSubject>()
                .HasOne(sc => sc.Class)
                .WithMany(s => s.ClassSubjects)
                .HasForeignKey(sc => sc.ClassId);

            modelBuilder.Entity<ClassSubject>()
                .HasOne(sc => sc.Subject)
                .WithMany(c => c.ClassSubjects)
                .HasForeignKey(sc => sc.SubjectId);
        }
        public new DbSet<User> Users { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Mark> Marks { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketMSG> TicketMSGs { get; set; }
        public DbSet<New> News { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<ScheduleItem> ScheduleItems { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<HomeWork> HomeWorks { get; set; }
        public DbSet<HomeworkItem> HomeworkItems { get; set; }
        public DbSet<ConfirmCode> ConfirmCodes { get; set; }
    }
}
