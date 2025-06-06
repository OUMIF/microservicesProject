// Controllers/FormationController.cs
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
    public class FormationController : ControllerBase
    {
        private readonly IFormationService _formationService;
       
        public FormationController(IFormationService formationService)
        {
            _formationService = formationService;
        }
       
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<FormationDto>>> GetAllFormations()
        {
            var formations = await _formationService.GetAllFormationsAsync();
            return Ok(formations);
        }
       
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FormationDto>> GetFormationById(int id)
        {
            var formation = await _formationService.GetFormationByIdAsync(id);
           
            if (formation == null)
                return NotFound($"Formation with ID {id} not found");
               
            return Ok(formation);
        }
       
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<FormationDto>> CreateFormation([FromBody] CreateFormationDto formationDto)
        {
            try
            {
                var createdFormation = await _formationService.CreateFormationAsync(formationDto);
                return CreatedAtAction(nameof(GetFormationById), new { id = createdFormation.IdFormation }, createdFormation);
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
        public async Task<ActionResult<FormationDto>> UpdateFormation(int id, [FromBody] UpdateFormationDto formationDto)
        {
            try
            {
                var updatedFormation = await _formationService.UpdateFormationAsync(id, formationDto);
               
                if (updatedFormation == null)
                    return NotFound($"Formation with ID {id} not found");
                   
                return Ok(updatedFormation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> DeleteFormation(int id)
        {
            var result = await _formationService.DeleteFormationAsync(id);
           
            if (!result)
                return NotFound($"Formation with ID {id} not found");
               
            return NoContent();
        }
    }
}