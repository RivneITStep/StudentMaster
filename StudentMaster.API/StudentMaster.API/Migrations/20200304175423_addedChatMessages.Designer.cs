﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StudentMaster.DAL;

namespace StudentMaster.API.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20200304175423_addedChatMessages")]
    partial class addedChatMessages
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ChatMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ownerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("senderId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("ownerId");

                    b.HasIndex("senderId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ClassSubject", b =>
                {
                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<int>("SubjectId")
                        .HasColumnType("int");

                    b.HasKey("ClassId", "SubjectId");

                    b.HasIndex("SubjectId");

                    b.ToTable("ClassSubject");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ConfirmCode", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Code")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsUsed")
                        .HasColumnType("bit");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.ToTable("ConfirmCodes");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.HomeWork", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("CreatorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("FileId")
                        .HasColumnType("int");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<string>("Theme")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TimeOfIssue")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ToTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("CreatorId");

                    b.HasIndex("FileId");

                    b.HasIndex("SubjectId");

                    b.ToTable("HomeWorks");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.HomeworkItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FileId")
                        .HasColumnType("int");

                    b.Property<int?>("HomeWorkId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("FileId");

                    b.HasIndex("HomeWorkId");

                    b.ToTable("HomeworkItems");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Mark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("SubjectId")
                        .HasColumnType("int");

                    b.Property<string>("TeacherId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.ToTable("Marks");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.New", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.RefreshToken", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("ToLife")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.HasKey("Id");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Schedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassId")
                        .HasColumnType("int");

                    b.Property<string>("Day")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.ToTable("Schedules");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ScheduleItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("End")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ScheduleId")
                        .HasColumnType("int");

                    b.Property<string>("Start")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ScheduleId");

                    b.ToTable("ScheduleItems");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.TeacherSubject", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("SubjectId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "SubjectId");

                    b.HasIndex("SubjectId");

                    b.ToTable("TeacherSubject");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("OwnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Topic")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.TicketMSG", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsAnswer")
                        .HasColumnType("bit");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TicketId")
                        .HasColumnType("int");

                    b.Property<string>("senderId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("TicketId");

                    b.HasIndex("senderId");

                    b.ToTable("TicketMSGs");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("img")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("myClassId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("myClassId");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.UserClasses", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "ClassId");

                    b.HasIndex("ClassId");

                    b.ToTable("UserClasses");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StudentMaster.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ChatMessage", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("ownerId");

                    b.HasOne("StudentMaster.DAL.Entities.User", "Sender")
                        .WithMany()
                        .HasForeignKey("senderId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ClassSubject", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Class", "Class")
                        .WithMany("ClassSubjects")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StudentMaster.DAL.Entities.Subject", "Subject")
                        .WithMany("ClassSubjects")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ConfirmCode", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", "user")
                        .WithMany()
                        .HasForeignKey("UserID");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.HomeWork", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Class", "Class")
                        .WithMany("HomeWorks")
                        .HasForeignKey("ClassId");

                    b.HasOne("StudentMaster.DAL.Entities.User", "Creator")
                        .WithMany()
                        .HasForeignKey("CreatorId");

                    b.HasOne("StudentMaster.DAL.Entities.Attachment", "File")
                        .WithMany()
                        .HasForeignKey("FileId");

                    b.HasOne("StudentMaster.DAL.Entities.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("SubjectId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.HomeworkItem", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Attachment", "File")
                        .WithMany()
                        .HasForeignKey("FileId");

                    b.HasOne("StudentMaster.DAL.Entities.HomeWork", "HomeWork")
                        .WithMany("HomeworkItems")
                        .HasForeignKey("HomeWorkId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Mark", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");

                    b.HasOne("StudentMaster.DAL.Entities.Subject", "Subject")
                        .WithMany()
                        .HasForeignKey("SubjectId");

                    b.HasOne("StudentMaster.DAL.Entities.User", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.RefreshToken", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Schedule", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Class", "Class")
                        .WithMany("Schedule")
                        .HasForeignKey("ClassId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.ScheduleItem", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Schedule", null)
                        .WithMany("Items")
                        .HasForeignKey("ScheduleId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.TeacherSubject", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Subject", "Subject")
                        .WithMany("teacherSubjects")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StudentMaster.DAL.Entities.User", "User")
                        .WithMany("teacherSubjects")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.Ticket", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.TicketMSG", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Ticket", null)
                        .WithMany("Msgs")
                        .HasForeignKey("TicketId");

                    b.HasOne("StudentMaster.DAL.Entities.User", "sender")
                        .WithMany()
                        .HasForeignKey("senderId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.User", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Class", "myClass")
                        .WithMany("Students")
                        .HasForeignKey("myClassId");
                });

            modelBuilder.Entity("StudentMaster.DAL.Entities.UserClasses", b =>
                {
                    b.HasOne("StudentMaster.DAL.Entities.Class", "Class")
                        .WithMany("UserClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("StudentMaster.DAL.Entities.User", "User")
                        .WithMany("UserClasses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
