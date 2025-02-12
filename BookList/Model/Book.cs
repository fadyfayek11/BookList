﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookList.Model
{
    public class Book
    {
        [Key]
        public int id { get; set; }

        [Required]
        public String Name { get; set; }

        public String Author { get; set; }

        public string ISBN { get; set; }
    }
}
