// Controllers/FiliereController.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FormationService.DTOs;
using FormationService.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FormationService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "Admin")] // Cette ligne restreint l'accès à tous les endpoints aux administrateurs
    public class FiliereController : ControllerBase
    {
        private readonly IFiliereService _filiereService;
        
        public FiliereController(IFiliereService filiereService)
        {
            _filiereService = filiereService;
        }
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<FiliereDto>>> GetAllFilieres()
        {
            var filieres = await _filiereService.GetAllFilieresAsync();
            return Ok(filieres);
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FiliereDto>> GetFiliereById(int id)
        {
            var filiere = await _filiereService.GetFiliereByIdAsync(id);
            
            if (filiere == null)
                return NotFound($"Filiere with ID {id} not found");
                
            return Ok(filiere);
        }
        
        [HttpGet("byFormation/{formationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<FiliereDto>>> GetFilieresByFormationId(int formationId)
        {
            var filieres = await _filiereService.GetFilieresByFormationIdAsync(formationId);
            return Ok(filieres);
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FiliereDto>> CreateFiliere([FromBody] CreateFiliereDto filiereDto)
        {
            try
            {
                var createdFiliere = await _filiereService.CreateFiliereAsync(filiereDto);
                return CreatedAtAction(nameof(GetFiliereById), new { id = createdFiliere.IdFiliere }, createdFiliere);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FiliereDto>> UpdateFiliere(int id, [FromBody] UpdateFiliereDto filiereDto)
        {
            try
            {
                var updatedFiliere = await _filiereService.UpdateFiliereAsync(id, filiereDto);
                
                if (updatedFiliere == null)
                    return NotFound($"Filiere with ID {id} not found");
                    
                return Ok(updatedFiliere);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteFiliere(int id)
        {
            var result = await _filiereService.DeleteFiliereAsync(id);
            
            if (!result)
                return NotFound($"Filiere with ID {id} not found");
                
            return NoContent();
        }
        
        [HttpPost("professors")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddProfessorToFiliere([FromBody] CreateProfessorReferenceDto professorReferenceDto)
        {
            var result = await _filiereService.AddProfessorToFiliereAsync(professorReferenceDto);
            
            if (!result)
                return BadRequest("Failed to add professor to filiere");
                
            return Ok();
        }
        
        [HttpDelete("professors/{filiereId}/{professorId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> RemoveProfessorFromFiliere(int filiereId, int professorId)
        {
            var result = await _filiereService.RemoveProfessorFromFiliereAsync(filiereId, professorId);
            
            if (!result)
                return NotFound("Professor reference not found");
                
            return NoContent();
        }
        
        [HttpGet("professors/{filiereId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ProfessorReferenceDto>>> GetProfessorsByFiliereId(int filiereId)
        {
            var professors = await _filiereService.GetProfessorsByFiliereIdAsync(filiereId);
            return Ok(professors);
        }
        
        [HttpPost("students")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddStudentToFiliere([FromBody] CreateStudentReferenceDto studentReferenceDto)
        {
            var result = await _filiereService.AddStudentToFiliereAsync(studentReferenceDto);
            
            if (!result)
                return BadRequest("Failed to add student to filiere");
                
            return Ok();
        }
        
        [HttpDelete("students/{filiereId}/{studentId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> RemoveStudentFromFiliere(int filiereId, int studentId)
        {
            var result = await _filiereService.RemoveStudentFromFiliereAsync(filiereId, studentId);
            
            if (!result)
                return NotFound("Student reference not found");
                
            return NoContent();
        }
        
        [HttpGet("students/{filiereId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<StudentReferenceDto>>> GetStudentsByFiliereId(int filiereId)
        {
            var students = await _filiereService.GetStudentsByFiliereIdAsync(filiereId);
            return Ok(students);
        }
    }
}