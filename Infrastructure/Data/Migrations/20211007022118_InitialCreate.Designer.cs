﻿// <auto-generated />
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(AssessorContext))]
    [Migration("20211007022118_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Core.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("TaxDecOfRealPropertyId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TaxDecOfRealPropertyId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Core.Entities.TaxDecOfRealProperty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ARPNumber")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.Property<decimal>("AssessedValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Class")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.Property<int>("EffectiveYear")
                        .HasMaxLength(13)
                        .HasColumnType("int");

                    b.Property<string>("Kind")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.Property<double>("LandArea")
                        .HasColumnType("float");

                    b.Property<string>("OwnerAddress")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("OwnerName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<decimal>("PreviousAV")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("PreviousTDNumber")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.Property<string>("PropertyIndex")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.Property<string>("PropertyLocation")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)")
                        .HasComment("e.g. General Revision");

                    b.Property<string>("SurveyLotNumber")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("TaxDecNumber")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("TaxableExempt")
                        .IsRequired()
                        .HasMaxLength(33)
                        .HasColumnType("nvarchar(33)");

                    b.HasKey("Id");

                    b.ToTable("TaxDecOfRealProperties");
                });

            modelBuilder.Entity("Core.Entities.Photo", b =>
                {
                    b.HasOne("Core.Entities.TaxDecOfRealProperty", "TaxDecOfRealProperty")
                        .WithMany("Photos")
                        .HasForeignKey("TaxDecOfRealPropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaxDecOfRealProperty");
                });

            modelBuilder.Entity("Core.Entities.TaxDecOfRealProperty", b =>
                {
                    b.Navigation("Photos");
                });
#pragma warning restore 612, 618
        }
    }
}