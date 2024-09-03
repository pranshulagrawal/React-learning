import json
import random
from datetime import datetime, timedelta

# Function to generate random dates
def random_date(start, end):
    return start + timedelta(days=random.randint(0, int((end - start).days)))

# Function to generate random phone numbers
def random_phone_number():
    return f"+91-{random.randint(1000, 9999)}-{random.randint(100000, 999999)}"

# Sample data for departments, locations, statuses, etc., specific to India
departments = ["Executive", "Human Resources", "Finance", "Engineering", "Marketing", "Sales", "Customer Support"]
locations = ["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata"]
statuses = ["Active", "On Leave", "Retired", "Closed"]
performance_ratings = ["A", "B", "C", "D"]
skills_pool = ["Leadership", "Strategic Planning", "Communication", "Technical Expertise", "Project Management"]

# Unique roles for each level from 1 to 16
roles_per_level = [
    ["CEO"],  # Level 1
    ["General Manager"],  # Level 2
    ["Operations Manager"],  # Level 3
    ["Senior Project Manager"],  # Level 4
    ["Project Manager"],  # Level 5
    ["Team Lead"],  # Level 6
    ["Software Architect"],  # Level 7
    ["Senior Software Engineer"],  # Level 8
    ["Software Engineer"],  # Level 9
    ["Junior Software Engineer"],  # Level 10
    ["Intern"],  # Level 11
    ["Data Analyst"],  # Level 12
    ["Quality Assurance Specialist"],  # Level 13
    ["Customer Support Lead"],  # Level 14
    ["Customer Support Specialist"],  # Level 15
    ["Trainee"]  # Level 16
]

# Function to generate a single node
def generate_node(id, level, parent_id, role):
    department = random.choice(departments)
    location = random.choice(locations)
    hire_date = random_date(datetime(2000, 1, 1), datetime(2023, 1, 1))
    status = random.choice(statuses)
    budget = random.randint(1000000, 50000000)  # Random budget value
    performance_rating = random.choice(performance_ratings) if level >= 2 else None
    skills = random.sample(skills_pool, 3)
    projects = random.sample(["Project Aryan", "Project Bhavya", "Project Chaitanya"], random.randint(1, 3))

    node = {
        "id": id,
        "name": f"Node {id}",
        "parentId": parent_id,
        "level": level,
        "roleTitle": role,
        "department": department,
        "location": location,
        "hireDate": hire_date.strftime("%Y-%m-%d"),
        "email": f"node{id}@example.com",
        "phoneNumber": random_phone_number(),
        "status": status,
        "budget": budget,
        "headCount": 0,  # Initial headcount is 0, will be updated later
        "projectAssigned": projects,
        "performanceRating": performance_rating,
        "skills": skills
    }

    return node

# Function to generate nodes and maintain the hierarchy
def generate_nodes(total_nodes_required, max_levels):
    nodes = []
    id_counter = 10000001
    nodes_per_level = {level: 0 for level in range(1, max_levels + 1)}  # To count nodes at each level
    nodes_to_process = [(None, 1)]  # (parent_id, level)
    total_nodes = 0

    # Generate nodes level by level
    while total_nodes < total_nodes_required and nodes_to_process:
        parent_id, level = nodes_to_process.pop(0)

        # Ensure there is a role for this level
        role = roles_per_level[level - 1][0]

        # Generate a node and append to the nodes list
        node = generate_node(id_counter, level, parent_id, role)
        nodes.append(node)
        total_nodes += 1
        nodes_per_level[level] += 1
        id_counter += 1

        # Ensure children are created for the next level
        if total_nodes < total_nodes_required:
            next_level = level + 1
            if next_level <= max_levels:
                # Number of children nodes to generate for the current node
                num_children = min(random.randint(1, 5), total_nodes_required - total_nodes)
                for _ in range(num_children):
                    nodes_to_process.append((node["id"], next_level))

    # Ensure that each level from 1 to max_levels is covered with at least one node
    for level in range(1, max_levels + 1):
        if nodes_per_level[level] == 0:
            # If a level was missed, create a node for it
            parent_level = level - 1 if level > 1 else None
            parent_id = next((n["id"] for n in nodes if n["level"] == parent_level), None)
            role = roles_per_level[level - 1][0]
            node = generate_node(id_counter, level, parent_id, role)
            nodes.append(node)
            total_nodes += 1
            nodes_per_level[level] += 1
            id_counter += 1

    # Link children to their parents and calculate headcount
    nodes_dict = {node["id"]: node for node in nodes}
    for node in nodes:
        if node["parentId"] is not None:
            parent_node = nodes_dict[node["parentId"]]
            if "children" not in parent_node:
                parent_node["children"] = []
            parent_node["children"].append(node)
            # Update headCount based on the number of children
            parent_node["headCount"] = len(parent_node["children"])

    # Remove empty "children" attributes
    for node in nodes:
        if "children" in node and not node["children"]:
            del node["children"]

    # Verify total nodes consistency
    assert total_nodes == sum(nodes_per_level.values()), "Mismatch in total nodes count!"

    # Return the root nodes (those with no parent) and total_nodes count
    return [node for node in nodes if node["parentId"] is None], total_nodes, nodes_per_level

# Parameters
total_nodes_required = 17000
max_levels = 16

# Generate the nodes
root_nodes, total_nodes_generated, nodes_per_level = generate_nodes(total_nodes_required, max_levels)

# Collect metadata
metadata = {
    "specifiedTotalNodes": total_nodes_required,
    "generatedTotalNodes": total_nodes_generated,
    "rolesPerLevel": roles_per_level,  # Include roles for each level in metadata
    "skills": skills_pool,
    "performanceRatings": performance_ratings,
    "locations": locations,
    "departments": departments,
    "statuses": statuses,
    "nodesPerLevel": nodes_per_level,  # Metadata for total nodes at each level
    "nodes": root_nodes
}

# Convert to JSON and save the nested organizational data
file_name = "nested_organizational_data_india.json"
json_data = json.dumps(metadata, indent=2)
with open(file_name, "w") as f:
    f.write(json_data)

# Function to flatten the nested nodes into a list
def flatten_nodes(nested_nodes):
    flat_list = []
    def _flatten(node):
        flat_list.append(node)
        if "children" in node:
            for child in node["children"]:
                _flatten(child)
    for root in nested_nodes:
        _flatten(root)
    return flat_list

# Flatten the nodes from the nested structure
all_nodes = flatten_nodes(root_nodes)

# Generate detailed information for each node with additional information
def generate_additional_node_details(node):
    # Example additional details
    biography = f"{node['name']} has been a key member of the {node['department']} department with expertise in {', '.join(node['skills'])}."
    career_history = [
        {"role": random.choice(roles_per_level[min(node['level']-1, len(roles_per_level)-1)]), "company": "Company A", "years": random.randint(1, 5)},
        {"role": random.choice(roles_per_level[min(node['level'], len(roles_per_level)-1)]), "company": "Company B", "years": random.randint(1, 5)}
    ]
    additional_projects = random.sample(["Project Prabhat", "Project Dhruv", "Project Esha"], random.randint(1, 2))
    notes = f"{node['name']} is currently working on optimizing the processes for {random.choice(node['projectAssigned'])}."

    return {
        "id": node["id"],
        "name": node["name"],
        "level": node["level"],
        "roleTitle": node["roleTitle"],
        "department": node["department"],
        "location": node["location"],
        "hireDate": node["hireDate"],
        "email": node["email"],
        "phoneNumber": node["phoneNumber"],
        "status": node["status"],
        "budget": node["budget"],
        "performanceRating": node["performanceRating"],
        "skills": node["skills"],
        "projectAssigned": node["projectAssigned"],
        "biography": biography,
        "careerHistory": career_history,
        "additionalProjects": additional_projects,
        "notes": notes
    }

# Generate node details with additional information
node_details = [generate_additional_node_details(node) for node in all_nodes]

# Save node details to a separate JSON file
node_details_file_name = "node_details.json"
node_details_json_data = json.dumps(node_details, indent=2)
with open(node_details_file_name, "w") as f:
    f.write(node_details_json_data)

print(f"Files '{file_name}' and '{node_details_file_name}' have been generated successfully.")
